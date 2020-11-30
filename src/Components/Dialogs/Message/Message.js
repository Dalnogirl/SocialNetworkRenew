import React from 'react';
import style from './Message.module.scss';


const Message = (props) => {
    return (
        <div className={style.message}>{props.text}</div>
    )

}



export default Message;
