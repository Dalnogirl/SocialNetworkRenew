import React from 'react';
import {addMessage} from "../../redux/reducers/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";
import {getInterluctors, getMessages} from "../../redux/selectors/selectors";


let mapStateToProps = (state) => {
    return {
        messages: getMessages(state),
        interluctors: getInterluctors(state),
    }
}



export default compose(
    connect(mapStateToProps, {addMessage}),
    withAuthRedirect,
)(Dialogs)
