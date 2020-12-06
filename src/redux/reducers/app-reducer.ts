import {setUserData} from "./auth-reducer";

let INITIALIZE = 'app-reducer/INITIALIZE'

type InitialState = {
    initializationSucceeded: boolean
}

type InitializeActionType = {
    type: typeof INITIALIZE

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



let initializeAC = (): InitializeActionType => ({type: INITIALIZE})

export let initialize = () => {
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