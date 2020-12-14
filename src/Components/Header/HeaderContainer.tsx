import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/reducers/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

type PropsType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    logout: () => void
}
let HeaderContainer = (props:PropsType) => { //todo headerContainer propstype:any
    return (
        <Header {...props}/>
    );

}

let mapStateToProps = (state: AppStateType) => {
    return ({
        id: state.auth.userId,
        login: state.auth.login,
        email: state.auth.email,
        isAuth: state.auth.isAuth
    })
}

export default connect(mapStateToProps, {logout})(HeaderContainer);
