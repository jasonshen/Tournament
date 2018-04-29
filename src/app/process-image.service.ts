import { Injectable } from '@angular/core';

@Injectable()
export class ProcessImageService {

    /**
     * Process image as base-64 encoding
     *
     * @param {File} input file to be encoded
     * @returns {Promise} Promise which resolves to base-64 image string or
     * rejects with an error
     * @memberof ProcessImageService
     */
    encodeAsBase64(input) {
        return new Promise((resolve, reject) => {
            const file: File = input;
            const fr: FileReader = new FileReader();
            fr.onloadend = function () {
                return resolve(fr.result);
            };

            fr.onerror = (err) => {
                return reject(err);
            };

            fr.readAsDataURL(file); // encodes file as base-64
        });
    }
}
