import React from 'react';
import style from './Profile.module.scss';

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


let Profile = (props) => {
    return (
        <div className={style.profile}>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateUserStatus={props.updateUserStatus}/>
            <MyPostsContainer />

        </div>
    )


}

export default Profile;
