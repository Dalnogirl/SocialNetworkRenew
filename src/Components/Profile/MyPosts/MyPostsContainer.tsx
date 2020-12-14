
import {deletePost, PostData, profileActions} from "../../../redux/reducers/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";


let mapStateToProps = (state: AppStateType) => ({
    posts: state.profileData.posts
})
let addPost = profileActions.addPost
type MSTP = {
    posts: PostData[]
}
type MDTP = {
    addPost: (text: string) => void
    deletePost: (postKey: number) => void
}
let MyPostsContainer = connect<MSTP,MDTP,{},AppStateType>(mapStateToProps, {addPost, deletePost})(MyPosts)

export default MyPostsContainer;
