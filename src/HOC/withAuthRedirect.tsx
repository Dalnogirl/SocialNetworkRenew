import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

type MSTPType = {
    isAuth: boolean
}
type MDTPType = {
}
type OwnType = {}
let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>) {
    let RedirectComponent: React.FC<MSTPType & MDTPType> = (props) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={`/login`}/>

        //нужно убирать isAuth, тк это пропсы именно хока и редирект компоненты
        return <Component {...restProps as WCP}/>
    }


    return connect<MSTPType, MDTPType, WCP, AppStateType>(
        mapStateToProps, {

        })
    (RedirectComponent)
}


