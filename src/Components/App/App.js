import React, {Suspense} from 'react';
import style from './App.module.scss';
import Navbar from "../Navbar/navbar";
import {BrowserRouter, HashRouter, Redirect, Route, withRouter} from "react-router-dom";

import UsersContainer from "../Users/UsersContainer";
import HeaderContainer from "../Header/HeaderContainer";
import LoginContainer from "../Login/LoginContainer";
import {connect, Provider} from "react-redux";
import {initialize} from "../../redux/reducers/app-reducer";
import Loader from "../Loader/Loader";
import {compose} from "redux";
import store from "../../redux/redux-store";

const ProfileContainer = React.lazy(() => import("../Profile/ProfileContainer"));
const DialogsContainer = React.lazy(() => import("../Dialogs/DialogsContainer"))


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
                    <Suspense fallback={<Loader/>}>
                        <div className={style.app_content_wrapper}>
                            <Route exact path='/' render={() => <Redirect to={`/profile`}/>}/>
                            <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                            <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
                            <Route path="/users" render={() => <UsersContainer/>}/>
                            <Route path="/login" render={() => <LoginContainer/>}/>
                        </div>
                    </Suspense>
                </div>

            )
            : (<Loader/>)
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
        <HashRouter>
            <AppContainer/>
        </HashRouter>
    </Provider>
}
//<BrowserRouter basename={process.env.PUBLIC_URL}>
export default SocialNetworkApp