import Dexie from 'dexie';

const db = new Dexie('ReportDatabase');
db.version(1).stores({
    reports: '++id,location,closest_match,percent_match,reported,fileInput'
});

export default db;