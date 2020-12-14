import {profileAPI} from "../../DAL/dal";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "../redux-store";


type InitialStateType = {
    posts: Array<PostData>
    profile: null | ProfileType
    status: null | string
}

export type ProfileType = {
    aboutMe: null | string
    contacts: any
    // contacts: {
    //     facebook: null | string
    //     website: null | string
    //     vk: null | string
    //     twitter: null | string
    //     instagram: null | string
    //     youtube: null | string
    //     github: string | null
    //     mainLink: null | string
    // },
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: ProfilePhotos
}

export type ProfilePhotos = {
    small: string
    large: string
}
export type PostData = {
    text: string
    id: number
}

let initialState: InitialStateType = {
    posts: [
        {text: 'lorem ipsum dolor sit amet ', id: 1},
        {text: 'lorem ipsum dolor sit', id: 2},
        {text: 'lorem dolor sit amet', id: 3},
        {text: 'lorem  sit amet', id: 4}],
    profile: null,
    status: null,
}


let profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD_POST': {
            let newPost = {
                text: action.text,
                id: 9
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        }
        case 'DELETE_POST': {
            return {
                ...state,
                posts: state.posts.filter(i => i.id !== action.postKey)
            }
        }
        case 'SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'SET_USER_STATUS': {
            return {
                ...state,
                status: action.text
            }
        }
        case 'UPDATE_USER_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'CHANGE_USER_PHOTO_SUCCESS': {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                } as ProfileType // todo
            }
        }
        default:
            return state
    }
}


//-----
type ActionsTypes = InferActionsTypes<typeof profileActions>


export let profileActions = {
    addPost: (text: string) => ({type: 'ADD_POST', text} as const),
    deletePostAC: (postKey: number) => ({type: 'DELETE_POST', postKey} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),
    setUserStatus: (text: string) => ({type: 'SET_USER_STATUS', text} as const),
    updateUserStatusAC: (status: string) => ({type: 'UPDATE_USER_STATUS', status} as const),
    changeUserPhotoSuccess: (photos: ProfilePhotos) => ({
        type: 'CHANGE_USER_PHOTO_SUCCESS',
        photos
    } as const)
}

//-----
type ThunkActionsType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export let getProfileById = (userId: number): ThunkActionsType => {
    return async (dispatch) => {
        let data = await profileAPI.getProfile(userId)
        dispatch(profileActions.setUserProfile(data))
    }
}

export let getUserStatusById = (id: number): ThunkActionsType => {
    return async (dispatch) => {
        let data = await profileAPI.getUserStatus(id)
        dispatch(profileActions.setUserStatus(data))
    }
}

export let updateUserStatus = (status: string): ThunkActionsType => {
    debugger
    return async (dispatch) => {
        let response = await profileAPI.updateUserStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(profileActions.updateUserStatusAC(status))
        }
    }
}

export let deletePost = (postKey: number): ThunkActionsType => {
    return async (dispatch) => {
        dispatch(profileActions.deletePostAC(postKey))
    }
}

export let changeUserPhoto = (photo: ProfilePhotos): ThunkActionsType => {
    return async (dispatch: any) => {
        let response = await profileAPI.updateUserPhoto(photo)
        if (response.data.resultCode === 0) {
            dispatch(profileActions.changeUserPhotoSuccess(response.data.data.photos))
        }
    }
}

export default profileReducer