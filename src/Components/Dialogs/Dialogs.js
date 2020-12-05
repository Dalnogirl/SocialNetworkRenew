import React from 'react';
import style from './Dialogs.module.scss';
import Interluctor from "./Interluctor/Interluctor";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import {DialogsTextarea} from "./DialogsTextarea/DialogsTextarea";


const Dialogs = (props) => {
    if (!props.isAuth) {
        return <Redirect to={`login`}/>
    }
    return (
        <div className={style.content}>
            <div className={style.interluctors}>
                {props.interluctors.map((item) => <Interluctor name={item.name} id={item.id}/>)}
            </div>
            <div className={style.messages}>
                <div className={style.messages}>
                    {props.messages
                        .map((item) => <Message text={item.text} id={item.id}/>)}
                </div>
                <DialogsTextarea addMessage={props.addMessage}/>
            </div>
        </div>
    );
}

export default Dialogs;
