import {authAPI, securityAPI, usersAPI} from "../../DAL/dal";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "../redux-store";


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
        case 'SET_USER_DATA': {
            return {
                ...state,
                ...action.data
            }
        }
        case 'GET_CAPTCHA_URL_SUCCESS': {
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
type ActionsTypes = InferActionsTypes<typeof actions>

type SetUserDataActionDataType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}


let actions = {
    setUserDataAC: (id: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
        type: 'SET_USER_DATA',
        data: {id, login, email, isAuth}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({type: 'GET_CAPTCHA_URL_SUCCESS', captchaUrl} as const)
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
        return usersAPI.setAuthDataAPI().then((data: SetAuthDataAPIResponceDataType) => { //{returns Promise} i use return for isInitialized flag in app component
            if (data.resultCode === 0) {
                let {id, login, email} = data.data
                return dispatch(actions.setUserDataAC(id, login, email, true))
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
    data.resultCode === 0 && dispatch(actions.setUserDataAC(null, null, null, false))

})

export let getCaptchaUrl = (): ThunkActionType => (async (dispatch: any) => {
    let captchaUrl = await securityAPI.getCaptchaUrl()
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl.url))
})


export default authReducer