import React from 'react';

import {addPost, deletePost} from "../../../redux/reducers/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";


let mapStateToProps = (state) => ({
    posts: state.profileData.posts,
    newPostText: state.profileData.newPostText
})


let MyPostsContainer = connect(mapStateToProps, {addPost, deletePost})(MyPosts)

export default MyPostsContainer;
