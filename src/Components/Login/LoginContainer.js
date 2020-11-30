import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {loginAuthorize} from "../../redux/reducers/auth-reducer";
import {Login} from "./Login";

class LoginContainer extends React.Component {
    render() {
        return (
            <Login {...this.props}/>
        )
    }
}

let mapStateToProps = state => ({isAuth: state.auth.isAuth});
export default compose(
    connect(mapStateToProps, {loginAuthorize})
)(LoginContainer)