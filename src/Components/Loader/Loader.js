import React from "react";
import style from './Loader.module.scss'

let Loader = (props) => {
    return (
        <div className={style.preloader}>
            <div className={style.spinner}></div>
        </div>)
}

export default Loader