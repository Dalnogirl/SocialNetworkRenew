import React from "react";
import style from './Loader.module.scss'

let Loader = () => {
    return (
        <div className={style.preloader}>
            <div className={style.spinner}/>
        </div>)
}

export default Loader