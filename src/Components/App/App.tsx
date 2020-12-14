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
import store, {AppStateType} from "../../redux/redux-store";

const ProfileContainer = React.lazy(() => import("../Profile/ProfileContainer").then())
const DialogsContainer = React.lazy(() => import("../Dialogs/DialogsContainer"))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initialize: () => void
}
type OwnPropsType = {}

class App extends React.Component<MapPropsType & DispatchPropsType > {
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

let mapStateToProps = (state: AppStateType) => ({
    initializationSucceeded: state.app.initializationSucceeded
})

//export default connect(mapStateToProps, {initialize})(App);
let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect<MapPropsType,DispatchPropsType,OwnPropsType, AppStateType>(mapStateToProps, {initialize}))(App);

let SocialNetworkApp = (props: any) => {

    return <Provider store={store}>
        <HashRouter>
            <AppContainer/>
        </HashRouter>
    </Provider>
}
//<BrowserRouter basename={process.env.PUBLIC_URL}>
export default SocialNetworkApp