import {setUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "../redux-store";

let INITIALIZE = 'app-reducer/INITIALIZE'

type InitialState = {
    initializationSucceeded: boolean
}


let initialState: InitialState = {
    initializationSucceeded: false
}


let appReducer = (state = initialState, action: any): InitialState => {
    switch (action.type) {
        case 'INITIALIZE': {
            return {
                ...state,
                initializationSucceeded: true,
            }
        }
        default:
            return state
    }
}


type ActionTypes = InferActionsTypes<typeof actions>

let actions = {initializeSuccess: () => ({type: 'INITIALIZE'} as const)}

export let initialize = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => {
    return async (dispatch: any) => {
        let promise = dispatch(setUserData())
        Promise.all([promise])
            .then(() => {
                    dispatch(actions.initializeSuccess())
                }
            )
    }
}


export default appReducer