import axios from 'axios';

const GET_RECORDS = "GET_RECORDS";

const getRecords = (records) => {
    return {
        type: GET_RECORDS,
        records
    }
}


export const getRecordsFromServer = (id) => {
    console.log('hello', id);
    return (dispatch) => {
        axios.get(`/api/matchinfo/${id}`)
            .then(res => res.data)
            .then(records => {
                console.log(records);
                dispatch(getRecords(records))
            })
    }
}

export const postRecord = (record, userId) => {
    record.userId = userId;
    console.log('postRecord', userId);
    return () => {
        axios.post(`/api/matchinfo/${userId}`, record)
            .then(res => res.data)
            .then(() => {
                console.log('hello');
                getRecordsFromServer(userId)
            })
    }
}

export default function (state = {}, action) {
    switch (action.type) {
        case GET_RECORDS:
            return action.records;
        default:
            return state;
    }

}