import {usersAPI} from "../../DAL/dal";
import {updatePropertyInArray} from "../../utilits/object-helper";
import {ProfilePhotos} from "./profile-reducer";
import {Dispatch} from "redux";
import {AppStateType, InferActionsTypes} from "../redux-store";
import {ThunkAction} from "redux-thunk";
import exp from "constants";

type InitialStateType = {
    users: Array<UserType>
    currentPage: number
    totalUsersCount: number
    usersOnPage: number
    isFetching: boolean
    asyncInProgress: Array<number>
    filter: FilterType
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
    usersOnPage: 9,
    isFetching: false,
    asyncInProgress: [],
    filter: {
        friend: null,
        term: ''
    }
}
export type FilterType = {
    friend: null| boolean
    term: string
}

let usersReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case 'FOLLOW': {
            return {
                ...state,
                users: updatePropertyInArray(state.users, 'id', action.id, {followed: true})
            }
        }
        case 'UNFOLLOW': {
            return {
                ...state,
                users: updatePropertyInArray(state.users, 'id', action.id, {followed: false})
            }
        }
        case 'SET_USERS': {
            return {...state, users: [...action.users]}
        }
        case 'SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case 'TOGGLE_ISFETCHING': {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case 'ASYNC_IN_PROGRESS': {
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
type ActionTypes = InferActionsTypes<typeof usersActions>


export let usersActions = {
    follow: (id: number) => ({type: 'FOLLOW', id: id} as const),
    unfollow: (id: number) => ({type: 'UNFOLLOW', id: id} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'SET_TOTAL_USERS_COUNT',
        totalUsersCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_ISFETCHING', isFetching} as const),
    toggleAsyncInProgress: (inProgress: boolean, id: number) => ({
        type: 'ASYNC_IN_PROGRESS',
        inProgress,
        id
    } as const),
    setFilter:(filter: FilterType) => ({type: 'SET_FILTER', payload: filter} as const)
}
// --------------------------------------------------------------------------------------------------------
// THUNK CREATORS

type ThunkActionsType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

type GetUsersAPIResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export const getUsers = (currentPage: number,
                         usersOnPage: number,
                         filter: FilterType
): ThunkActionsType => {
    return async (dispatch) => {
        dispatch(usersActions.toggleIsFetching(true))
        dispatch(usersActions.setFilter(filter))

        let data: GetUsersAPIResponseType = await usersAPI.getUsersAPI(currentPage, usersOnPage, filter)
        dispatch(usersActions.toggleIsFetching(false))
        dispatch(usersActions.setUsers(data.items))
        dispatch(usersActions.setTotalUsersCount(data.totalCount))
    }
}

export const followUser = (id: number): ThunkActionsType => {
    let APIMethod = usersAPI.followUserAPI
    let AC = usersActions.follow
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, id, APIMethod, AC)
    }
}

export const unfollowUser = (id: number): ThunkActionsType => {
    let APIMethod = usersAPI.unfollowUserAPI
    let AC = usersActions.unfollow
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, id, APIMethod, AC)
    }
}

let _followUnfollowFlow = async (dispatch: Dispatch<ActionTypes>, id: number, APIMethod: any, AC: any) => {
    dispatch(usersActions.toggleAsyncInProgress(true, id))
    let data = await APIMethod(id)
    if (data.resultCode === 0) dispatch(AC(id))
    dispatch(usersActions.toggleAsyncInProgress(false, id))
}

export default usersReducer