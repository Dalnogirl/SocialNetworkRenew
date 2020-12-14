import React from 'react';
import style from './Post.module.scss';

type PropsType = {
    deletePost: (postId: number) => void
    key: number
    id: number
    text: string
}
const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={style.post}>
            <img className={style.post_icon} src="https://www.searchpng.com/wp-content/uploads/2019/02/Profile-ICon.png"
                 alt=""/>
            <div className={style.post_content}>
                <h2>Post headline</h2>
                <p>{props.text}</p>
            </div>
            <div className={style.deletePostButton} onClick={() => {
                props.deletePost(props.id)
            }}>Delete
            </div>

        </div>

    )
}

export default Post;
