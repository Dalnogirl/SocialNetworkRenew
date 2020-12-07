import React, {useEffect} from 'react';
import {connect, DefaultRootState} from "react-redux";
import {
    followUser, getUsers,
    setCurrentPage,
    toggleAsyncInProgress,
    unfollowUser, UserType
} from "../../redux/reducers/users-reducer";
import Loader from "../Loader/Loader";
import Users from "./Users";
import {
    getAsyncInProgress,
    getCurrentPage,
    getIsFetching,
    getTotalUsersCount,
    getUsersComplex,
    getUsersOnPage
} from "../../redux/selectors/selectors";
import {AppStateType} from '../../redux/redux-store';
import {compose} from "redux";

type MapDispatchPropsType = {
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
    setCurrentPage: (currentPageNumber: number) => void
    getUsers: (currentPage: number, usersOnPage: number) => void
}

type MapStatePropsType = {
    currentPage: number
    usersOnPage: number
    isFetching: boolean
    asyncInProgress: Array<number>
    users: Array<UserType>
    totalUsersCount: number
}

type OwnPropsType = {}


type PropsType = MapStatePropsType & MapDispatchPropsType  & OwnPropsType

let UsersContainer: React.FC<PropsType> = ({
                                               getUsers, currentPage, usersOnPage, setCurrentPage,
                                               isFetching, asyncInProgress, users, totalUsersCount,
                                               followUser, unfollowUser
                                           }) => {

    useEffect(() => {
        getUsers(currentPage, usersOnPage)
    }, [currentPage, usersOnPage, getUsers])

    let onButtonClick = (currentPageNumber: number) => {
        setCurrentPage(currentPageNumber)
        getUsers(currentPageNumber, usersOnPage)
    }

    return (
        <>
            {isFetching ? <Loader/> : null}
            <Users currentPage={currentPage}
                   asyncInProgress={asyncInProgress}
                   users={users}
                   totalUsersCount={totalUsersCount}
                   usersOnPage={usersOnPage}
                   onButtonClick={onButtonClick}
                   followUser={followUser}
                   unfollowUser={unfollowUser}
            /></>)

}


let mapStateToProps = (state: AppStateType): MapStatePropsType=> {
    return {
        users: getUsersComplex(state),
        currentPage: getCurrentPage(state),
        totalUsersCount: getTotalUsersCount(state),
        usersOnPage: getUsersOnPage(state),
        isFetching: getIsFetching(state),
        asyncInProgress: getAsyncInProgress(state)
    }
}
//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
        mapStateToProps,
        {setCurrentPage, followUser, unfollowUser, getUsers})
)(UsersContainer)


