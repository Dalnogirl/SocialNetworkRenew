import React from 'react';
import style from './Message.module.scss';


const Message = (props: { text: string }) => {
    return (
        <div className={style.message}>{props.text}</div>
    )

}


export default Message;
