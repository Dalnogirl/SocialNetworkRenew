import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
    changeUserPhoto,
    getProfileById,
    getUserStatusById, ProfileType,
    updateUserStatus,
} from "../../redux/reducers/profile-reducer";
import Profile from "./Profile";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";
import {getProfile, getStatus} from "../../redux/selectors/selectors";
import {AppStateType} from "../../redux/redux-store";

type PathParamsType = {
    userId: string
}

let ProfileContainer: React.FC<OwnProps & MSTP & MDTP & RouteComponentProps<PathParamsType>> = (props) => {
    useEffect(() => {
        let userId = +props.match.params.userId
        if (!userId) {
            userId = 7668;
        }
        props.getProfileById(userId)
        props.getUserStatusById(userId)

    }, [props.match.params.userId])

    return <Profile {...props} isOwner={!props.match.params.userId}/>
}


let mapStateToProps = (state: AppStateType): MSTP => ({
    profile: getProfile(state),
    status: getStatus(state)
})
type MSTP = {
    profile: ProfileType | null
    status: string | null
}
type MDTP = {
    getProfileById: (id: number) => void
    getUserStatusById: (id: number) => void
    updateUserStatus: (text: string) => void
    changeUserPhoto: (photo: any) => void //todo formData typization for photos
}

type OwnProps = {
    isOwner: boolean
}
export default compose<React.ComponentType>(
    connect<MSTP, MDTP, OwnProps, AppStateType>(mapStateToProps, {
        getProfileById,
        getUserStatusById,
        updateUserStatus,
        changeUserPhoto
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
