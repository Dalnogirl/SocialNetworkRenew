import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
    changeUserPhoto,
    deletePost,
    getProfileById,
    getUserStatusById,
    updateUserStatus,
} from "../../redux/reducers/profile-reducer";
import Profile from "./Profile";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";
import {getProfile, getStatus} from "../../redux/selectors/selectors";

// class ProfileClassContainer extends React.Component {
//     componentDidMount() {
//         let userId = this.props.match.params.userId
//         if (!userId) {
//             userId = 7668;
//         }
//         this.props.getProfileById(userId)
//         this.props.getUserStatusById(userId)
//
//     }
//
//     render() {
//         return (
//             <Profile {...this.props}
//                 // profile={this.props.profile}
//                 // updateUserStatus={this.props.updateUserStatus}
//             />
//         )
//     }
//
// }

let ProfileContainer = (props) => {
    useEffect(() => {
        let userId = props.match.params.userId
        if (!userId) {
            userId = 7668;
        }
        props.getProfileById(userId)
        props.getUserStatusById(userId)

    }, [props.match.params.userId])

    return <Profile {...props}
                    isOwner={!props.match.params.userId}/>
}


let mapStateToProps = (state) => ({
    profile: getProfile(state),
    status: getStatus(state)
})

export default compose(
    connect(mapStateToProps, {
        getProfileById,
        getUserStatusById,
        updateUserStatus,
        changeUserPhoto
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
