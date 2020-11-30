import React from 'react';
import style from './ProfileInfo.module.scss';
import Loader from "../../Loader/Loader";
import icon from '../../../assets/images/64495.png'
import Status from "./Status/Status";



const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Loader/>
    }
    return (
        <div className={style.profileInfo}>
            <img className={style.profileImage} src={props.profile.photos.large ? props.profile.photos.large : icon}
                 alt=""/>
            <div className={style.description}>
                <div className={style.name}>{props.profile.fullName}</div>
                <Status status={props.status}
                        updateUserStatus={props.updateUserStatus}/>
            </div>
        </div>
    )


}

export default ProfileInfo;


