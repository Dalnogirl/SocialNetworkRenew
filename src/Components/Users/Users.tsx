import React from "react";
import style from "./Users.module.scss";
import UserCard from "./UserCard/UserCard";
import userImage from "../../assets/images/64495.png";
import Paginator from "../common/Paginator/Paginator";
import {UserType} from "../../redux/reducers/users-reducer";

type PropsType = {
    users: Array<UserType>
    currentPage: number
    totalUsersCount: number
    usersOnPage: number
    asyncInProgress: Array<number>

    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
    onButtonClick: (currentPage: number)=>void
}

let Users: React.FC<PropsType> = ({
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
            {users.map((u) => <UserCard
                //className={style.userCard}
                followed={u.followed}
                userImage={u.photos.small ? u.photos.small : userImage}
                userName={u.name}
                id={u.id}
                asyncInProgress={asyncInProgress}
                followUser={followUser}
                unfollowUser={unfollowUser}/>)}
        </div>)

}

// @ts-ignore
export default Users