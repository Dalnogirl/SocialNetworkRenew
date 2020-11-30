import React from 'react';
import style from './UserCard.module.scss';
import {NavLink} from "react-router-dom";


const UserCard = ({
                      userStatus, userLocation, id,
                      userImage, userName, followed,
                      asyncInProgress, unfollowUser, followUser
                  }) => {

    return (
        <div className={style.userCard}>
            <NavLink to={`/profile/${id}`} className={style.photo_name_container}>
                <img className={style.userImage} src={userImage} alt=""/>
                <div className={style.name}>{userName}</div>
            </NavLink>


            <div><p>{userStatus}</p></div>
            <div><p>{userLocation}</p></div>
            <div>
                {followed
                    ? <button disabled={asyncInProgress.some(i => i === id)}
                              onClick={() => {
                                  unfollowUser(id)
                              }}>Unfollow
                    </button>

                    : <button disabled={asyncInProgress.some(i => i === id)}
                              onClick={() => {
                                  followUser(id)
                              }}>Follow
                    </button>}
            </div>
        </div>
    )
}

export default UserCard
