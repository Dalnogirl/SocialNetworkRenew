import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {getCaptchaUrl, loginAuthorize} from "../../redux/reducers/auth-reducer";
import {Login} from "./Login";

class LoginContainer extends React.Component {
    render() {
        return (
            <Login {...this.props}/>
        )
    }
}

let mapStateToProps = state => ({isAuth: state.auth.isAuth, captchaUrl: state.auth.captchaUrl});
export default compose(
    connect(mapStateToProps, {loginAuthorize, getCaptchaUrl})
)(LoginContainer)