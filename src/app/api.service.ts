import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

    basePath: String = 'https://www.headlightlabs.com/api';
    auth_key: String = 'ewjMW6Y3jHrXlVIpYmSx5w';
    lookupEndPoint: String = 'gcpd_lookup';
    reportEndPoint: String = 'gcpd_report';
    constructor(private http: HttpClient) {

    }

    /**
     * allows a particular photo to be reported as a match.
     * @method reportVillain
     * @param {String} img Image to be send to the API for lookup (base-64 encoding)
     * @memberof ApiService
     */
    reportVillain(img: any) {
        const requestBody = {
            api_key: this.auth_key,
            image_contents: img,
        };
        return this.http.post(`${this.basePath}/${this.reportEndPoint}`, requestBody);
    }

    /**
     * Send image to the API for lookup
     * @method performLookup
     * @param {String} img Image to be send to the API for reporting (base-64 encoding)
     * @memberof ApiService
     */
    performVillainLookup(img: any) {
        const requestBody = {
            api_key: this.auth_key,
            image_contents: img
        };
        return this.http.post(`${this.basePath}/${this.lookupEndPoint}`, requestBody);
    }
}
