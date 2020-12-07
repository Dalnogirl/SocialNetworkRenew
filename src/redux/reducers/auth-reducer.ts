import {authAPI, securityAPI, setAuthDataAPI} from "../../DAL/dal";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";

const SET_USER_DATA = 'auth-reducer/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = `auth-reducer/GET_CAPTCHA_URL_SUCCESS`

type InitialStateType = {
    userId: null | number
    isAuth: boolean
    email: null | string
    password: null | string
    rememberMe: boolean
    captchaUrl: null | string
    login: null | string
}

let initialState: InitialStateType = {
    userId: null,
    isAuth: false,
    email: null,
    password: null,
    rememberMe: false,
    captchaUrl: null,
    login: null
}

let authReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data
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
//-----
type ActionsTypes = SetUserDataActionType | GetCaptchaUrlSuccessActionType

type SetUserDataActionDataType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}
type SetUserDataActionType = {
    type: typeof SET_USER_DATA
    data: SetUserDataActionDataType
}
let setUserDataAC = (id: number | null, login: string | null, email: string | null, isAuth: boolean): SetUserDataActionType => {
    return {
        type: SET_USER_DATA,
        data: {id, login, email, isAuth}
    }
}

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    captchaUrl: string
}
let getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        captchaUrl
    }
}


type SetAuthDataAPIResponceDataType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: number

}


//-----
type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
export let setUserData = (): ThunkActionType => {
    return async (dispatch: any) => {
        return setAuthDataAPI().then((data: SetAuthDataAPIResponceDataType) => { //{returns Promise} i use return for isInitialized flag in app component
            if (data.resultCode === 0) {
                let {id, login, email} = data.data
                return dispatch(setUserDataAC(id, login, email, true))
            }
        })
    }
}


type LoginAuthorizeData = {
    email: string
    password: string
    rememberMe: boolean
    captchaUrl: string | null
}
export let loginAuthorize = (data: LoginAuthorizeData): ThunkActionType => {
    let {email, password, rememberMe, captchaUrl} = data
    return async (dispatch: any) => {
        let data = await authAPI.loginAuthorize(email, password, rememberMe, captchaUrl)
        if (data.resultCode === 0) {
            dispatch(setUserData())
        }
        if (data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
    }
}

export let logout = (): ThunkActionType => (async (dispatch: any) => {
    let data = await authAPI.logout()
    data.resultCode === 0 && dispatch(setUserDataAC(null, null, null, false))

})

export let getCaptchaUrl = (): ThunkActionType => (async (dispatch: any) => {
    let captchaUrl = await securityAPI.getCaptchaUrl()
    dispatch(getCaptchaUrlSuccess(captchaUrl.url))
})


export default authReducer