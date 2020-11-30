import React from 'react';
import style from './Header.module.scss';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <div className={style.header}>
            <img className={style.logo} src="" alt=""/>
            <h1>Social Network</h1>
            {(props.isAuth) ? (
                    <div>
                        <div>
                            <NavLink to={`/profile`}>{props.login}</NavLink>
                        </div>
                        <button onClick={() => {
                            props.logout()
                        }}>Logout
                        </button>
                    </div>)
                : <NavLink to={`/login`} className="loginBlock">LOGIN</NavLink>}
        </div>
    );
}

export default Header;
