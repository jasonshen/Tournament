import { Component } from '@angular/core';
import { ProcessImageService } from './process-image.service';
import { ApiService } from './api.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Wayne Corp Face Recognition UI';
    response: String = '';
    error: String = '';
    percentMatch: any = null;
    imgSrc;
    lookupCalled = false;

    constructor(
        private processImage: ProcessImageService,
        private apiService: ApiService,
    ) { }

    /**
     * Displays image inside card for reference
     *
     * @param {any} img Image File
     * @memberof AppComponent
     */
    displayImg(img) {
        this.imgSrc = img;
    }

    /**
     * General Error Handler
     *
     * @private
     * @param {HttpErrorResponse} error
     * @returns {Observable}
     * @memberof AppComponent
     */
    private handleError(error: HttpErrorResponse) {
        console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
        this.error = 'Something bad happened in our Database, please try again later and sorry for the inconvenience';
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(this.response);
    }

    /**
     * Sets response to be displayed
     *
     * @private
     * @param {Object} resp in the following format:
     * {
        "location":"https://headlight.s3.amazonaws.com/gGQhTbt_O9wD2lFxRdbzPw/elKtOo6L4EXKkkp2NmVXVw",
        "closest_match":"Agitator Aligator",
        "percent_match":53
     * }
     * @memberof AppComponent
     */
    private formatResponse(resp) {
        this.percentMatch = resp['percent_match'];
        if (this.percentMatch < 40) {
            this.response = 'Always look out but seems like this is a nice person :)';
        } else if (this.percentMatch > 40 && this.percentMatch < 75) {
            this.response = 'We are not so sure but please be always careful';
        } else {
            this.response = ` Watch out! Our Database has identified this person as a Villain with
                            ${this.percentMatch}% certainty!`;
        }
    }


    /**
     * Look up suspect on a database
     *
     * @param {File} imgData image data from input field
     * @memberof AppComponent
     */
    lookedUpVillain(imgData) {
        this.lookupCalled = true;
        this.processImage.encodeAsBase64(imgData)
            .then((imgProcessed: any) => {
                this.apiService.performVillainLookup(imgProcessed)
                .pipe(catchError(this.handleError))
                .subscribe((lookedUpData) => {
                    this.displayImg(imgProcessed);
                    this.formatResponse(lookedUpData);
                });
            })
            .catch((err) => {
                this.error = 'Sorry but we have trouble processing your image';
            });
    }

    /**
     * Report Villain.
     *
     * @param {File} imgData image data from input field
     * @memberof AppComponent
     */
    reportVillain(imgData) {
        this.lookupCalled = false;
        this.processImage.encodeAsBase64(imgData)
            .then((imgProcessed) => {
                this.displayImg(imgProcessed);
                this.apiService.reportVillain(imgProcessed)
                    .pipe(catchError(this.handleError))
                    .subscribe((resp) => {
                        this.response = resp.status;
                    });
            })
            .catch((err) => {
                this.error = 'Sorry but we have trouble processing your image';
            });
    }
}

