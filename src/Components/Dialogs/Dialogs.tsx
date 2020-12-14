import React from 'react';
import style from './Dialogs.module.scss';
import Interluctor from "./Interluctor/Interluctor";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import {DialogsTextarea} from "./DialogsTextarea/DialogsTextarea";
import {InterluctorType, MessageType} from "../../redux/reducers/dialogs-reducer";

type PropsType = {
    messages: Array<MessageType>
    interluctors: Array<InterluctorType>
    addMessage: (text: string)=>void
}
const Dialogs = (props:PropsType) => {
    return (
        <div className={style.content}>
            <div className={style.interluctors}>
                {props.interluctors.map((item: InterluctorType) => <Interluctor name={item.name} id={item.id}/>)}
            </div>
            <div className={style.messages}>
                <div className={style.messages}>
                    {props.messages
                        .map((item:MessageType) => <Message key={1} text={item.text} />)}
                </div>
                <DialogsTextarea addMessage={props.addMessage}/>
            </div>
        </div>
    );
}

export default Dialogs;
