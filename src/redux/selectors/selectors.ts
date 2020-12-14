import {createSelector} from "reselect";
import {AppStateType} from "../redux-store";

export let getProfile = (state: AppStateType) => state.profileData.profile

export let getStatus = (state: AppStateType) => state.profileData.status

export let getMessages = (state : AppStateType) => state.dialogsData.messages

export let getInterluctors = (state: AppStateType) => state.dialogsData.interluctors

let getUsersData = (state:  AppStateType) => state.usersData.users

export let getUsersComplex = createSelector(getUsersData,(users)=>{
    return users
})

export let getCurrentPage = (state: AppStateType) => state.usersData.currentPage

export let getFilter = (state: AppStateType) => state.usersData.filter
export let getTotalUsersCount = (state: AppStateType) => state.usersData.totalUsersCount

export let getUsersOnPage = (state: AppStateType) => state.usersData.usersOnPage

export let getIsFetching = (state: AppStateType) => state.usersData.isFetching

export let getAsyncInProgress = (state: AppStateType) => state.usersData.asyncInProgress

