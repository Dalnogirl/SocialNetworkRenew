import React from 'react';
import style from './UserCard.module.scss';
import {NavLink} from "react-router-dom";

type PropsType = {
    followed: boolean
    userImage: any
    userName: string
    id: number




    asyncInProgress: Array<number>

    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void

}

const UserCard: React.FC<PropsType> = ({
                                           id,
                                           userImage, userName, followed,
                                           asyncInProgress, unfollowUser, followUser
                                       }) => {

    return (
        <div className={style.userCard}>
            <NavLink to={`/profile/${id}`} className={style.photo_name_container}>
                <img className={style.userImage} src={userImage} alt=""/>
                <div className={style.name}>{userName}</div>
            </NavLink>


            <div>
                {followed
                    ? <button className={style.button} disabled={asyncInProgress.some(i => i === id)}
                              onClick={() => {
                                  unfollowUser(id)
                              }}>Unfollow
                    </button>

                    : <button className={style.button} disabled={asyncInProgress.some(i => i === id)}
                              onClick={() => {
                                  followUser(id)
                              }}>Follow
                    </button>}
            </div>
        </div>
    )
}

export default UserCard
