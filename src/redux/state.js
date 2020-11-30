import profileReducer from "./reducers/profile-reducer";
import dialogsReducer from "./reducers/dialogs-reducer";


let store = {
    _state: {

        dialogsData: {
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
            newMessageText: '',
        },
        profileData: {
            posts: [
                {text: 'lorem ipsum dolor sit amet '},
                {text: 'lorem ipsum dolor sit'},
                {text: 'lorem dolor sit amet'},
                {text: 'lorem  sit amet'}],
            newPostText: '',

        }
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this.updateEntireTree = observer
    },
    updateEntireTree() {
        console.log('state changed')
    },
    dispatch(action) {
        this._state.profileData = profileReducer(this._state.profileData, action)
        this._state.dialogsData = dialogsReducer(this._state.dialogsData, action)
        this.updateEntireTree(this._state)


    }


}



window.store = store
export default store