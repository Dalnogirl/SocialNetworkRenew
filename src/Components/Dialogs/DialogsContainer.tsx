import React from 'react';
import {dialogsActions, InterluctorType, MessageType} from "../../redux/reducers/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";
import {getInterluctors, getMessages} from "../../redux/selectors/selectors";
import {AppStateType} from "../../redux/redux-store";


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        messages: getMessages(state),
        interluctors: getInterluctors(state),
    }
}


type MapStatePropsType = {
    messages: Array<MessageType>
    interluctors: Array<InterluctorType>
}
type MapDispatchPropsType = {
    addMessage: (messageText: string) => void

}
type OwnPropsType ={
}

let addMessage = dialogsActions.addMessage
export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {addMessage}),
    withAuthRedirect,
)(Dialogs)
