import {profileAPI, setAuthDataAPI} from "../../DAL/dal";
import {setUserData} from "./auth-reducer";

const UPDATE_POST_TEXTAREA = 'profile-reducer/UPDATE-POST-TEXTAREA'
const ADD_POST = 'profile-reducer/ADD-POST'
const SET_USER_PROFILE = 'profile-reducer/SET_USER_PROFILE'
const SET_USER_STATUS = 'profile-reducer/SET_USER_STATUS'
const UPDATE_USER_STATUS = 'profile-reducer/UPDATE_USER_STATUS'
const DELETE_POST = 'profile-reducer/DELETE_POST'


let initialState = {
    posts: [
        {text: 'lorem ipsum dolor sit amet ', id: 1},
        {text: 'lorem ipsum dolor sit', id: 2},
        {text: 'lorem dolor sit amet', id: 3},
        {text: 'lorem  sit amet', id: 4}],
    profile: null,
    status: null

}


let profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_POST_TEXTAREA:
            return {
                ...state,
                newPostText: action.text
            }
        case ADD_POST: {
            let newPost = {
                text: action.text,
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
        default:
            return state
    }
}


export let addPost = (text) => ({type: ADD_POST, text})
export let deletePostAC = (postKey) => ({type: DELETE_POST, postKey})
export let setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
let setUserStatus = (text) => ({type: SET_USER_STATUS, text})
let updateUserStatusAC = (status) => ({type: UPDATE_USER_STATUS, status})


export let getProfileById = (userId) => {
    return async (dispatch) => {
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

export let getUserStatusById = (id) => {
    return async (dispatch) => {
        let data = await profileAPI.getUserStatus(id)
        dispatch(setUserStatus(data))
    }
}

export let updateUserStatus = (status) => {
    return async (dispatch) => {
        let response = await profileAPI.updateUserStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(updateUserStatusAC(status))
        }
    }
}

export let deletePost = (postKey) => {
    return (dispatch) => {
        dispatch(deletePostAC(postKey))
    }
}

export default profileReducer