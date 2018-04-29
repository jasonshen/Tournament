import axios from 'axios';



const GET_USER = 'GET_USER';


const getUser = (user) => {
    return {
        type: GET_USER,
        user
    }
}

const REMOVE_USER = 'REMOVE_USER';

const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

export const checkSession = () => {
    return (dispatch) => {
        axios.get('/api/user')
            .then(res => res.data)
            .then(user => {
                console.log('user', user)
                if (user) {
                    dispatch(getUser(user))
                }
            })
            .catch(err => {
                console.log('check session', err)
            })
    }
}

export const signOut = () => {
    return (dispatch) => {
        axios.delete('/api/user')
            .then(() => {
                dispatch(removeUser())
                // history.goBack();
            })
            .catch(err => {
                console.log('session delete', err)
            })
    }
}

export const userSignup = (credentials, history) => {
    return (dispatch) => {
        // console.log(credentials)
        axios.post('/api/user', credentials)
            .then(res => res.data)
            .then(user => {
                dispatch(getUser(user))
                history.push('/');
            })
    }
}

export const login = (credentials, history) => {
    return (dispatch) => {
        axios.post('/api/user/login', credentials)
            .then(res => res.data)
            .then(user => {
                dispatch(getUser(user))
                history.push('/');
            })
    }
}

export default function (state = {}, action) {
    switch (action.type) {
        case GET_USER:
            return Object.assign({}, state, action.user)
        case REMOVE_USER:
            return {};
        default:
            return state;
    }

}