import React, {useState} from 'react';
import style from './ProfileInfo.module.scss';
import Loader from "../../Loader/Loader";
import icon from '../../../assets/images/64495.png'
import Status from "./Status/Status";
import changeAvatar from '../../../assets/images/changeAvatar.svg'
import ProfileContactForm from "./ProfileContactForm/ProfileContactForm";


const ProfileInfo = (props) => {
    let [editMode, toggleEditMode] = useState(false)
    if (!props.profile) {
        return <Loader/>
    }
    return (
        <div className={style.profileInfo}>
            <div className={style.description}>
                <img className={style.profileImage}
                     src={props.profile.photos.large ? props.profile.photos.large : icon}
                     alt=""/>


            </div>
            <div className={style.profileData}>
                <div className={style.nameAndChangePhoto}>
                    <div className={style.name}>{props.profile.fullName}</div>
                    <ChangePhoto isOwner={props.isOwner} changeUserPhoto={props.changeUserPhoto}/>
                </div>
                <Status status={props.status}
                        updateUserStatus={props.updateUserStatus}/>
                {editMode
                    ? <ProfileContactForm
                        toggleEditMode={toggleEditMode}
                        contacts={props.profile.contacts}/>
                    : <div className={style.contacts}>
                        <p><b>Contacts</b></p>
                        <div>
                            {Object.keys(props.profile.contacts).map(key => (<Contact key={key}
                                                                                      contactKey={key}
                                                                                      contactValue={props.profile.contacts[key]}/>))}
                        </div>
                        <button onClick={() => {
                            toggleEditMode(true)
                        }}>Change Contacts
                        </button>
                    </div>}

            </div>
        </div>
    )
}


let ChangePhoto = ({isOwner, changeUserPhoto}) => {
    return (isOwner && <label className={style.customFileUpload}>
            <img className={style.changeAvatar} src={changeAvatar} alt=""/>
            <input type="file" onChange={(e) => {
                if (e.target.files.length) {
                    changeUserPhoto(e.target.files[0])
                }

            }}/>
        </label>
    )
}

let Contact = ({contactKey, contactValue}) => {
    console.log(contactValue)
    return <div>
        <span className={style.contactKey}>{contactKey}: </span>
        <span className={style.contactValue}>{contactValue? contactValue: `no info`}</span>
    </div>

}

export default ProfileInfo;


