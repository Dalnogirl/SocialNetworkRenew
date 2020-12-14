import React from 'react';
import style from './Profile.module.scss';

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/reducers/profile-reducer";

type PropsType = {
    updateUserStatus: (text: string) => void
    changeUserPhoto: (photo: any) => void
    profile: ProfileType | null
    status: string | null
    isOwner: boolean
}
let Profile: React.FC<PropsType> = (props) => {
    return (
        <div className={style.profile}>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         isOwner={props.isOwner}
                         updateUserStatus={props.updateUserStatus}
                         changeUserPhoto={props.changeUserPhoto}/>
            <MyPostsContainer />

        </div>
    )


}

export default Profile;
