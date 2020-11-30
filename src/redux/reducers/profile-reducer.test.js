import profileReducer, {addPost, deletePost, deletePostAC} from "./profile-reducer";

//initial test data
let initialState = {
    posts: [
        {text: 'lorem ipsum dolor sit amet ', id: 1},
        {text: 'lorem ipsum dolor sit', id: 2},
        {text: 'lorem dolor sit amet', id: 3},
        {text: 'lorem  sit amet', id: 4}],
    profile: null,
    status: null

}


it('new post should be added', () => {
    //action
    let action = addPost('some test text')
    //expectation
    let newState = profileReducer(initialState, action)
    expect(newState.posts[4].text).toBe('some test text')

})

it('post should be deleted', () => {
    let action = deletePostAC(1)
    let newState = profileReducer(initialState, action)
    expect(newState.posts.length).toBe(3)
})