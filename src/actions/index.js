import axios from 'axios';
import db from '../db';

const BASE_API_URL = 'https://www.headlightlabs.com/api';
const API_KEY = 'xKgXMJgXsseX3IUSScCZXA';

export const actions = {
    gcpdLookup: () => async (state, actions) => {
        const fileInput = document.getElementById('input').files[0];
        const formData = new FormData();

        formData.append('api_key', API_KEY);
        formData.append('image', fileInput);

        try {
            const res = await axios.post(`${BASE_API_URL}/gcpd_lookup`, formData);

            await db.reports.put({ ...res.data, fileInput, reported: false, });
            const reports = await db.reports.toArray();

            actions.uploaded.add(reports);
        } catch (err) {
            console.log(err);
        }
    },

    loadPastReports: () => async (state, actions) => {
        const reports = await db.reports.toArray();
        actions.uploaded.add(reports);
    },

    reportMatch: location => async (state, actions) => {
        const report = await db.reports.get({ location });
        const formData = new FormData();

        formData.append('api_key', API_KEY);
        formData.append('image', report.fileInput);

        try {
            const res = await axios.post(`${BASE_API_URL}/gcpd_report`, formData);

            await db.reports.put({ ...report, reported: true });
            const reports = await db.reports.toArray();

            actions.uploaded.add(reports);
        } catch (err) {
            console.log(err);
        }
    },

    uploaded: {
        add: newReports => state => {
            return {
                reportData: newReports
            };
        },
    }
};