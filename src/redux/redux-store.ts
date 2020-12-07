import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./reducers/profile-reducer";
import dialogsReducer from "./reducers/dialogs-reducer";
import usersReducer from "./reducers/users-reducer";
import authReducer from "./reducers/auth-reducer";
import thunkMiddleWare from "redux-thunk";
import appReducer from "./reducers/app-reducer";

let rootReducer = combineReducers({
    profileData: profileReducer,
    dialogsData: dialogsReducer,
    usersData: usersReducer,
    auth: authReducer,
    app: appReducer
})

type RootReducerType = typeof rootReducer //return (globalState: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType> // or just stateType for mapStateToProps functions


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)));
//let store = createStore(reducers, applyMiddleware(thunkMiddleWare))

// @ts-ignore
window.store = store

// @ts-ignore
export default store