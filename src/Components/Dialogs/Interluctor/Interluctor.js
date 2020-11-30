import React from 'react';
import style from './Interluctor.module.scss';
import {NavLink} from "react-router-dom";

const Interluctor = (props) => {
    return (
        <div>
            <NavLink className={style.interluctor} to={`/dialogs/${props.id}`}>{props.name}</NavLink>
        </div>
    )

}



export default Interluctor;
