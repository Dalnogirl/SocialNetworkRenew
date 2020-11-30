import {authAPI, setAuthDataAPI} from "../../DAL/dal";

const SET_USER_DATA = 'auth-reducer/SET_USER_DATA'
const LOGIN_AUTHORIZE = 'auth-reducer/LOGIN_AUTHORIZE'
const LOGOUT = 'auth-reducer/LOGOUT'


let initialState = {
    userId: null,
    isAuth: false,
    email: null,
    password: null,
    rememberMe: false,
    captcha: undefined,
    login: null

}

let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data
            }
        }
        case LOGIN_AUTHORIZE: {
            return {
                ...state,
                ...action.data

            }
        }
        case LOGOUT: {
            return {
                ...state,
                email: null,
                password: null,
                rememberMe: false,
                captcha: undefined,
                isAuth: false
            }
        }
        default:
            return state
    }
}

let setUserDataAC = (id, login, email, isAuth) => {
    return {
        type: SET_USER_DATA,
        data: {id, login, email, isAuth}
    }
}


export let setUserData = () => {
    return async (dispatch) => {
        return setAuthDataAPI().then(data => { //{returns Promise} i use return for isInitialized flag in app component
            if (data.resultCode === 0) {
                let {id, login, email} = data.data
                return dispatch(setUserDataAC(id, login, email, true))
            }
        })
    }
}

export let loginAuthorize = (data) => {
    let {email, password, rememberMe, captcha} = data
    return async (dispatch) => {
        let data = await authAPI.loginAuthorize(email, password, rememberMe, captcha)
        console.log(data)
        if (data.resultCode === 0) {dispatch(setUserData())}
    }
}
export let logout = () => (async dispatch => {
    let data = await authAPI.logout()
    data.resultCode === 0 && dispatch(setUserDataAC(null, null, null, false))

})


export default authReducer