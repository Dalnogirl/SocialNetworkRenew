const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
    interluctors: [
        {name: 'name1', id: '1'},
        {name: 'name2', id: '2'},
        {name: 'name3', id: '3'},
        {name: 'name4', id: '4'}],
    messages: [
        {text: 'Hi'},
        {text: 'Hello'},
        {text: 'Hola'},
        {text: 'Salut'}],
}

let dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                text: action.text
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
            }
        default:
            return state
    }
}


export let addMessage = (text) => ({type: SEND_MESSAGE, text})

export default dialogsReducer