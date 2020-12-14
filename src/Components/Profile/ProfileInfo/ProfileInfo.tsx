import React, {useState} from 'react';
import style from './ProfileInfo.module.scss';
import Loader from "../../Loader/Loader";
import icon from '../../../assets/images/64495.png'
import Status from "./Status/Status";
import changeAvatar from '../../../assets/images/changeAvatar.svg'
import ProfileContactForm from "./ProfileContactForm/ProfileContactForm";
import {ProfileType} from "../../../redux/reducers/profile-reducer";

type PropsType = {
    profile?: ProfileType | null
    status: string | null
    isOwner: boolean
    updateUserStatus: (text: string) => void
    changeUserPhoto: (photo: any) => void
}

const ProfileInfo: React.FC<PropsType> = (props) => {
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

                            { Object.keys(props.profile.contacts).map(key => (<Contact key={key}
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
type ChangePhoto = {
    isOwner: any
    changeUserPhoto: (photo: any) => void
}

let ChangePhoto: React.FC<ChangePhoto> = ({isOwner, changeUserPhoto}) => {
    return (isOwner && <label className={style.customFileUpload}>
            <img className={style.changeAvatar} src={changeAvatar} alt=""/>
            <input type="file" onChange={(e) => {
                // @ts-ignore
                if (e.target.files.length) {
                    // @ts-ignore
                    changeUserPhoto(e.target.files[0])
                }

            }}/>
        </label>
    )
}
type ContactProps = {
    contactKey: string
    contactValue: string | null

}
let Contact: React.FC<ContactProps> = ({contactKey, contactValue}) => {
    return <div>
        <span className={style.contactKey}>{contactKey}: </span>
        <span className={style.contactValue}>{contactValue ? contactValue : `no info`}</span>
    </div>

}

export default ProfileInfo;


