import React from 'react';
import style from './App.module.scss';
import Navbar from "../Navbar/navbar";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import DialogsContainer from "../Dialogs/DialogsContainer";
import UsersContainer from "../Users/UsersContainer";
import ProfileContainer from "../Profile/ProfileContainer";
import HeaderContainer from "../Header/HeaderContainer";
import LoginContainer from "../Login/LoginContainer";
import {connect, Provider} from "react-redux";
import {initialize} from "../../redux/reducers/app-reducer";
import Loader from "../Loader/Loader";
import {compose} from "redux";
import store from "../../redux/redux-store";


class App extends React.Component {
    componentDidMount() {
        this.props.initialize()
    }

    render() {
        return this.props.initializationSucceeded ?
            (
                <div className={style.app}>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className={style.app_content_wrapper}>
                        <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                        <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
                        <Route path="/users" render={() => <UsersContainer/>}/>
                        <Route path="/login" render={() => <LoginContainer/>}/>
                    </div>
                </div>

            ) : (<Loader/>)
    }
}

let mapStateToProps = (state) => ({
    initializationSucceeded: state.app.initializationSucceeded
})

//export default connect(mapStateToProps, {initialize})(App);
let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initialize}))(App);

let SocialNetworkApp = (props) => {

    return <Provider store={store}>
        <BrowserRouter>
            <AppContainer/>
        </BrowserRouter>
    </Provider>
}

export default SocialNetworkApp