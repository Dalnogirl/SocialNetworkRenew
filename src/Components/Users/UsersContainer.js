import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {
    followUser, getUsers,
    setCurrentPage,
    toggleAsyncInProgress,
    unfollowUser
} from "../../redux/reducers/users-reducer";
import Loader from "../Loader/Loader";
import Users from "./Users";
import {
    getAsyncInProgress,
    getCurrentPage,
    getIsFetching,
    getTotalUsersCount, getUsersComplex,
    getUsersOnPage
} from "../../redux/selectors/selectors";
// class a extends React.Component {
//
//     componentDidMount() {
//         this.props.getUsers(this.props.currentPage, this.props.usersOnPage)
//     }
//
//     onButtonClick = (currentPageNumber) => {
//         this.props.setCurrentPage(currentPageNumber)
//         this.props.getUsers(currentPageNumber, this.props.usersOnPage)
//
//
//     }
//
//     render() {
//
//         return (
//             <>
//                 {this.props.isFetching ? <Loader/> : null}
//                 <Users currentPage={this.props.currentPage}
//                        asyncInProgress={this.props.asyncInProgress}
//                        users={this.props.users}
//                        totalUsersCount={this.props.totalUsersCount}
//                        usersOnPage={this.props.usersOnPage}
//                        onButtonClick={this.onButtonClick}
//                        followUser={this.props.followUser}
//                        unfollowUser={this.props.unfollowUser}
//                 /></>)
//     }
// }

let UsersContainer = ({
                          getUsers, currentPage, usersOnPage, setCurrentPage,
                          isFetching, asyncInProgress, users, totalUsersCount,
                          followUser, unfollowUser
                      }) => {

    useEffect(() => {
        getUsers(currentPage, usersOnPage)
    }, [currentPage, usersOnPage, getUsers])

    let onButtonClick = (currentPageNumber) => {
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


let mapStateToProps = (state) => {
    return {
        users: getUsersComplex(state),
        currentPage: getCurrentPage(state),
        totalUsersCount: getTotalUsersCount(state),
        usersOnPage: getUsersOnPage(state),
        isFetching: getIsFetching(state),
        asyncInProgress: getAsyncInProgress(state)
    }
}

export default connect(mapStateToProps, {
    setCurrentPage,
    followUser,
    unfollowUser,
    toggleAsyncInProgress,
    getUsers
})(UsersContainer)


