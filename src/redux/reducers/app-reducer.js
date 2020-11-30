import {setUserData} from "./auth-reducer";

let INITIALIZE = 'app-reducer/INITIALIZE'


let initialState = {
    initializationSucceeded: false

}

let appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE: {
            return {
                ...state,
                initializationSucceeded: true
            }
        }
        default:
            return state
    }
}

let initializeAC = () => ({type: INITIALIZE})

export let initialize = () => {
    return async (dispatch) => {
        let promise = dispatch(setUserData())
        Promise.all([promise])
            .then(() => {
                    dispatch(initializeAC())
                }
            )
    }
}


export default appReducer