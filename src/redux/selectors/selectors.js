import {createSelector} from "reselect";

export let getProfile = state => state.profileData.profile

export let getStatus = state => state.profileData.status

export let getMessages = state => state.dialogsData.messages

export let getInterluctors = state => state.dialogsData.interluctors

let getUsersData = state => state.usersData.users

export let getUsersComplex = createSelector(getUsersData,(users)=>{
    return users.filter(u => true)
})

export let getCurrentPage = state => state.usersData.currentPage

export let getTotalUsersCount = state => state.usersData.totalUsersCount

export let getUsersOnPage = state => state.usersData.usersOnPage

export let getIsFetching = state => state.usersData.isFetching

export let getAsyncInProgress = state => state.usersData.asyncInProgress