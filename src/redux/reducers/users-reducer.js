import {followUserAPI, getUsersAPI, unfollowUserAPI} from "../../DAL/dal";
import {updatePropertyInArray} from "../../utilits/object-helper";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_ISFETCHING = 'TOGGLE_ISFETCHING'
const ASYNC_IN_PROGRESS = 'ASYNC_IN_PROGRESS'

let initialState = {
    users: [],
    currentPage: 1,
    totalUsersCount: 300,
    usersOnPage: 10,
    isFetching: false,
    asyncInProgress: []
}

let usersReducer = (state = initialState, action) => {
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
                    : [state.asyncInProgress].filter(item => item !== action.id)
            }
        }
        default:
            return state
    }
}

// --------------------------------------------------------------------------------------------------------
// ACTION CREATORS

export let follow = (id) => ({type: FOLLOW, id: id})
export let unfollow = (id) => ({type: UNFOLLOW, id: id})
let setUsers = (users) => ({type: SET_USERS, users})
export let setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
let setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
let toggleIsFetching = (isFetching) => ({type: TOGGLE_ISFETCHING, isFetching})
export let toggleAsyncInProgress = (inProgress, id) => ({type: ASYNC_IN_PROGRESS, inProgress, id})

// --------------------------------------------------------------------------------------------------------
// THUNK CREATORS

export const getUsers = (currentPage, usersOnPage) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        getUsersAPI(currentPage, usersOnPage)
            .then(data => {
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(data.items))
                setTotalUsersCount(data.totalCount)
            })
    }
}

let followUnfollowFlow = async (dispatch, id, APIMethod, AC) => {
    dispatch(toggleAsyncInProgress(true, id))
    let data = await APIMethod(id)
    if (data.resultCode === 0) {
        dispatch(AC(id))
    }
    dispatch(toggleAsyncInProgress(false, id))
}

export const followUser = (id) => {
    let APIMethod = followUserAPI
    let AC = follow
    return (dispatch) => {
        followUnfollowFlow(dispatch, id, APIMethod, AC)
    }
}

export const unfollowUser = (id) => {
    let APIMethod = unfollowUserAPI
    let AC = unfollow
    return async (dispatch) => {
        followUnfollowFlow(dispatch, id, APIMethod, AC)
    }
}


export default usersReducer