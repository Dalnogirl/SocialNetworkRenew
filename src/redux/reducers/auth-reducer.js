import {authAPI, securityAPI, setAuthDataAPI} from "../../DAL/dal";

const SET_USER_DATA = 'auth-reducer/SET_USER_DATA'
const LOGIN_AUTHORIZE = 'auth-reducer/LOGIN_AUTHORIZE'
const LOGOUT = 'auth-reducer/LOGOUT'
const GET_CAPTCHA_URL_SUCCESS = `auth-reducer/GET_CAPTCHA_URL_SUCCESS`


let initialState = {
    userId: null,
    isAuth: false,
    email: null,
    password: null,
    rememberMe: false,
    captchaUrl: null,
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
                captchaUrl: undefined,
                isAuth: false
            }
        }
        case GET_CAPTCHA_URL_SUCCESS: {

            return {
                ...state,
                captchaUrl: action.captchaUrl
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

let getCaptchaUrlSuccess = (captchaUrl) => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        captchaUrl
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
    let {email, password, rememberMe, captchaUrl} = data
    return async (dispatch) => {
        let data = await authAPI.loginAuthorize(email, password, rememberMe, captchaUrl)
        if (data.resultCode === 0) {
            dispatch(setUserData())
        }
        if (data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
    }
}

export let logout = () => (async dispatch => {
    let data = await authAPI.logout()
    data.resultCode === 0 && dispatch(setUserDataAC(null, null, null, false))

})

export let getCaptchaUrl = () => (async dispatch => {
    let captchaUrl = await securityAPI.getCaptchaUrl()
    dispatch(getCaptchaUrlSuccess(captchaUrl.url))
})


export default authReducer