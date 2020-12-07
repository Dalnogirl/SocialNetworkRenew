import {setUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";

let INITIALIZE = 'app-reducer/INITIALIZE'

type InitialState = {
    initializationSucceeded: boolean
}



let initialState: InitialState = {
    initializationSucceeded: false
}


let appReducer = (state = initialState, action: any): InitialState => {
    switch (action.type) {
        case INITIALIZE: {
            return {
                ...state,
                initializationSucceeded: true,
            }
        }
        default:
            return state
    }
}


type ActionTypes = InitializeActionType
type InitializeActionType = {
    type: typeof INITIALIZE

}
let initializeAC = (): InitializeActionType => ({type: INITIALIZE})

export let initialize = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => {
    return async (dispatch: any) => {
        let promise = dispatch(setUserData())
        Promise.all([promise])
            .then(() => {
                    dispatch(initializeAC())
                }
            )
    }
}


export default appReducer