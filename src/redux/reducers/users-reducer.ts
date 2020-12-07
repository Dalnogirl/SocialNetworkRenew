import {followUserAPI, getUsersAPI, unfollowUserAPI} from "../../DAL/dal";
import {updatePropertyInArray} from "../../utilits/object-helper";
import {ProfilePhotos} from "./profile-reducer";
import exp from "constants";
import {Dispatch} from "redux";
import {AppStateType} from "../redux-store";
import {ThunkAction} from "redux-thunk";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_ISFETCHING = 'TOGGLE_ISFETCHING'
const ASYNC_IN_PROGRESS = 'ASYNC_IN_PROGRESS'

type InitialStateType = {
    users: Array<UserType>
    currentPage: number
    totalUsersCount:  number
    usersOnPage: number
    isFetching: boolean
    asyncInProgress: Array<number>
}
export type UserType = {
    id: number
    name: string
    status: string | null
    photos: ProfilePhotos
    followed: boolean
}
let initialState: InitialStateType = {
    users: [],
    currentPage: 1,
    totalUsersCount: 0,
    usersOnPage: 10,
    isFetching: false,
    asyncInProgress: [],
}

let usersReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: updatePropertyInArray(state.users, 'id', action.id, {followed: true})
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: updatePropertyInArray(state.users, 'id', action.id, {followed: false})
            }
        }
        case SET_USERS: {
            return {...state, users: [...action.users]}
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            debugger
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case TOGGLE_ISFETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case ASYNC_IN_PROGRESS: {
            return {
                ...state,
                asyncInProgress: action.inProgress
                    ? [...state.asyncInProgress, action.id]
                    : state.asyncInProgress.filter((item) => item !== action.id)
            }
        }
        default:
            return state
    }
}

// --------------------------------------------------------------------------------------------------------
// ACTION CREATORS
//Use this type for dispatch function and action typization in reducer
type ActionTypes =
    FollowActionType
    | UnfollowActionType
    | SetUsersActionType
    | SetCurrentPage
    | SetTotalUsersCountActionType
    | ToggleIsFetchingActionType
    | ToggleAsyncInProgressActionType

type FollowActionType = {
    type: typeof FOLLOW
    id: number
}
export let follow = (id: number): FollowActionType => ({type: FOLLOW, id: id})

type UnfollowActionType = {
    type: typeof UNFOLLOW
    id: number
}
export let unfollow = (id: number): UnfollowActionType => ({type: UNFOLLOW, id: id})

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
let setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users})

type SetCurrentPage = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export let setCurrentPage = (currentPage: number): SetCurrentPage => ({type: SET_CURRENT_PAGE, currentPage})

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
let setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
})

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_ISFETCHING
    isFetching: boolean
}
let toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type: TOGGLE_ISFETCHING, isFetching})

type ToggleAsyncInProgressActionType = {
    type: typeof ASYNC_IN_PROGRESS
    inProgress: boolean
    id: number
}
export let toggleAsyncInProgress = (inProgress: boolean, id: number): ToggleAsyncInProgressActionType => ({
    type: ASYNC_IN_PROGRESS,
    inProgress,
    id
})

// --------------------------------------------------------------------------------------------------------
// THUNK CREATORS

type ThunkActionsType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

type GetUsersAPIResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export const getUsers = (currentPage: number,
                         usersOnPage: number): ThunkActionsType => {
    return async (dispatch, getState) => {
        dispatch(toggleIsFetching(true))
        let data: GetUsersAPIResponseType = await getUsersAPI(currentPage, usersOnPage)
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(data.items))
                dispatch(setTotalUsersCount(data.totalCount))
    }
}

export const followUser = (id: number): ThunkActionsType => {
    let APIMethod = followUserAPI
    let AC = follow
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, id, APIMethod, AC)
    }
}

export const unfollowUser = (id: number):ThunkActionsType => {
    let APIMethod = unfollowUserAPI
    let AC = unfollow
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, id, APIMethod, AC)
    }
}

let _followUnfollowFlow = async (dispatch: Dispatch<ActionTypes>, id: number, APIMethod: any, AC: any) => {
    dispatch(toggleAsyncInProgress(true, id))
    let data = await APIMethod(id)
    if (data.resultCode === 0) {
        dispatch(AC(id))
    }
    dispatch(toggleAsyncInProgress(false, id))
}

export default usersReducer