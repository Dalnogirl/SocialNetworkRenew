const SEND_MESSAGE = 'SEND-MESSAGE'

type InterluctorType = {
    name: string
    id: number
}
type MessageType = {
    text: string

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
        case SEND_MESSAGE:
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

type ActionsTypes = AddMessageActionType
type AddMessageActionType = {
    type: typeof SEND_MESSAGE
    text: string
}
export let addMessage = (text: string): AddMessageActionType => ({type: SEND_MESSAGE, text})

export default dialogsReducer