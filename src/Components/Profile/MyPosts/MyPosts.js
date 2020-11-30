import React from 'react';
import style from './MyPosts.module.scss';
import Post from "../Post/Post";
import {PostTextarea} from "./PostTextarea/PostTextarea";


const MyPosts = props => {
    return (
        <div className={style.my_posts}>
            <PostTextarea addPost={props.addPost}/>
            {props.posts.reverse().map((obj) => <Post deletePost={props.deletePost}
                                            key={obj.id}
                                            id={obj.id}
                                            text={obj.text}/>)}
        </div>

    );
};


export default React.memo(MyPosts);
