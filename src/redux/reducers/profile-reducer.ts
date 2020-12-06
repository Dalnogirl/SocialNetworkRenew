import {profileAPI, setAuthDataAPI} from "../../DAL/dal";
import {setUserData} from "./auth-reducer";

const UPDATE_POST_TEXTAREA = 'profile-reducer/UPDATE-POST-TEXTAREA'
const ADD_POST = 'profile-reducer/ADD-POST'
const SET_USER_PROFILE = 'profile-reducer/SET_USER_PROFILE'
const SET_USER_STATUS = 'profile-reducer/SET_USER_STATUS'
const UPDATE_USER_STATUS = 'profile-reducer/UPDATE_USER_STATUS'
const DELETE_POST = 'profile-reducer/DELETE_POST'
const CHANGE_USER_PHOTO_SUCCESS = 'profile-reducer/CHANGE_USER_PHOTO_SUCCESS'

type InitialStateType = {
    posts: Array<PostData>
    profile: null | ProfileData
    status: null | string
}

type ProfileData = {
    userId: number | null
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: ProfilePhotos
}

export type ProfilePhotos = {
    small: string
    large: string
}
type PostData = {
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
    status: null
}


let profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                text: action.text,
                id: 9
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(i => i.id !== action.postKey)
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.text
            }
        }
        case UPDATE_USER_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case CHANGE_USER_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                } as ProfileData // todo
            }
        }
        default:
            return state
    }
}

type AddPostActionType = {
    type: typeof ADD_POST
    text: string
}
export let addPost = (text: string): AddPostActionType => ({type: ADD_POST, text})

type DeletePostActionType = {
    type: typeof DELETE_POST
    postKey: number
}
export let deletePostAC = (postKey: number): DeletePostActionType => ({type: DELETE_POST, postKey})

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileData
}
export let setUserProfile = (profile: ProfileData): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})

type SetUserStatusActionType = {
    type: typeof SET_USER_STATUS
    text: string
}
let setUserStatus = (text: string): SetUserStatusActionType => ({type: SET_USER_STATUS, text})

type UpdateUserStatusActionType = {
    type: typeof UPDATE_USER_STATUS
    status: string
}
let updateUserStatusAC = (status: string): UpdateUserStatusActionType => ({type: UPDATE_USER_STATUS, status})


type ChangeUserPhotoSuccessActionType = {
    type: typeof CHANGE_USER_PHOTO_SUCCESS
    photos: ProfilePhotos
}
let changeUserPhotoSuccess = (photos: ProfilePhotos): ChangeUserPhotoSuccessActionType => ({
    type: CHANGE_USER_PHOTO_SUCCESS,
    photos
})


export let getProfileById = (userId: number) => {
    return async (dispatch: any) => {
        if (!userId) {
            let data = await setAuthDataAPI()
            if (data.resultCode === 0) {
                userId = data.data.id
            }
            data = await profileAPI.getProfile(userId)
            dispatch(setUserProfile(data))
        } else {
            let data = await profileAPI.getProfile(userId)
            dispatch(setUserProfile(data))
        }
    }
}

export let getUserStatusById = (id: number) => {
    return async (dispatch: any) => {
        let data = await profileAPI.getUserStatus(id)
        dispatch(setUserStatus(data))
    }
}

export let updateUserStatus = (status: string) => {
    return async (dispatch: any) => {
        let response = await profileAPI.updateUserStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(updateUserStatusAC(status))
        }
    }
}

export let deletePost = (postKey: number) => {
    return (dispatch: any) => {
        dispatch(deletePostAC(postKey))
    }
}

export let changeUserPhoto = (photo: any) => { //todo

    return async (dispatch: any) => {
        let response = await profileAPI.updateUserPhoto(photo)
        if (response.data.resultCode === 0) {
            debugger
            dispatch(changeUserPhotoSuccess(response.data.data.photos))
        }
    }
}

export default profileReducer