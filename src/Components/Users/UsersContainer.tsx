import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {
    FilterType,
    followUser,
    getUsers,
    unfollowUser,
    usersActions,
    UserType
} from "../../redux/reducers/users-reducer";
import Loader from "../Loader/Loader";
import Users from "./Users";
import {
    getAsyncInProgress,
    getCurrentPage, getFilter,
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
    getUsers: (currentPage: number, usersOnPage: number, filter: FilterType) => void
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type OwnPropsType = {}


type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

let UsersContainer: React.FC<PropsType> = ({
                                               getUsers, currentPage, usersOnPage, setCurrentPage,
                                               isFetching, asyncInProgress, users, totalUsersCount,
                                               followUser, unfollowUser, filter
                                           }) => {

    useEffect(() => {
        getUsers(currentPage, usersOnPage, filter)
    }, [currentPage, usersOnPage, getUsers])

    function onButtonClick(currentPageNumber: number) {
        setCurrentPage(currentPageNumber)
        getUsers(currentPageNumber, usersOnPage,filter)
    }

    return (
        <>
            {isFetching ? <Loader/> : null}
            <Users currentPage={currentPage}
                   getUsers={getUsers}
                   asyncInProgress={asyncInProgress}
                   users={users}
                   totalUsersCount={totalUsersCount}
                   usersOnPage={usersOnPage}
                   onButtonClick={onButtonClick}
                   followUser={followUser}
                   unfollowUser={unfollowUser}
            /></>)

}


let mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsersComplex(state),
        currentPage: getCurrentPage(state),
        totalUsersCount: getTotalUsersCount(state),
        usersOnPage: getUsersOnPage(state),
        isFetching: getIsFetching(state),
        asyncInProgress: getAsyncInProgress(state),
        filter: getFilter(state)
    }
}
//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
let setCurrentPage = usersActions.setCurrentPage
export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
        mapStateToProps,
        {setCurrentPage, followUser, unfollowUser, getUsers})
)(UsersContainer)


