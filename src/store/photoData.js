// Action types

const GET_PHOTO_DATA = 'GET_PHOTO_DATA'

// Action creators

export const getPhotoData = (data) => {

    return {
        type: GET_PHOTO_DATA,
        data: { data }
    }
}
// Reducer

export default function (state = {}, action) {
    switch (action.type) {
        case GET_PHOTO_DATA:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}