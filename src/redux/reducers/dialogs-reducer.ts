import {InferActionsTypes} from "../redux-store";

const SEND_MESSAGE = 'SEND-MESSAGE'

export type InterluctorType = {
    name: string
    id: number
}
export type MessageType = {
    text: string | null

}

let initialState = {
    interluctors: [
        {name: 'name1', id: 1},
        {name: 'name2', id: 2},
        {name: 'name3', id: 3},
        {name: 'name4', id: 4}
    ] as Array<InterluctorType>,
    messages: [
        {text: 'Hi'},
        {text: 'Hello'},
        {text: 'Hola'},
        {text: 'Salut'}
    ] as Array<MessageType>
}

type InitialStateType = typeof initialState

let dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SEND_MESSAGE':
            let newMessage = {
                text: action.text
            }
            return {
                ...state,
                messages: [...state.messages, newMessage]
            }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof dialogsActions>

export let dialogsActions = {
    addMessage: (text: string) => ({type: 'SEND_MESSAGE', text}as const)
}



export default dialogsReducer