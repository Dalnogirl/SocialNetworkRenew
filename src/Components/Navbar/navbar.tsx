import React from 'react';
import style from './navbar.module.scss';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <div className={style.navbar}>

            <NavLink className={style.link} to="/profile" activeClassName={style.active}>Profile</NavLink>
            <NavLink className={style.link} to="/users" activeClassName={style.active}>Users</NavLink>
            <NavLink className={style.link} to="/dialogs" activeClassName={style.active}>Dialogs</NavLink>
            <NavLink className={style.link} to="/news" activeClassName={style.active}>News</NavLink>
            <NavLink className={style.link} to="/music" activeClassName={style.active}>Music</NavLink>
            <NavLink className={style.link} to="/settings" activeClassName={style.active}>Settings</NavLink>

        </div>
    );
}

export default Navbar;
