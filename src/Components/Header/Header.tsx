import React from 'react';
import style from './Header.module.scss';
import {NavLink} from "react-router-dom";

type PropsType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    logout: () => void
}

const Header = (props: PropsType) => {
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

// @ts-ignore
export default Header;