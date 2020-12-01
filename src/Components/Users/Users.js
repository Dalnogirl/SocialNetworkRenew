import React from "react";
import style from "./Users.module.scss";
import UserCard from "./UserCard/UserCard";
import userImage from "../../assets/images/64495.png";
import Paginator from "../common/Paginator/Paginator";


let Users = ({
                 users, currentPage, onButtonClick,
                 totalUsersCount, usersOnPage, asyncInProgress,
                 followUser, unfollowUser
             }) => {
    return (
        <div className={style.users}>
            <Paginator currentPage={currentPage}
                       onButtonClick={onButtonClick}
                       totalUsersCount={totalUsersCount}
                       itemsOnPage={usersOnPage}
                       portionSize={10}
            />
            {users.map(u => <UserCard
                className={style.userCard}
                followed={u.followed}
                userImage={u.photos.small ? u.photos.small : userImage}
                userName={u.name}
                userLocation={u.userLocation}
                userStatus={u.userStatus}
                id={u.id}
                asyncInProgress={asyncInProgress}
                followUser={followUser}
                unfollowUser={unfollowUser}/>)}
        </div>)

}

export default Users