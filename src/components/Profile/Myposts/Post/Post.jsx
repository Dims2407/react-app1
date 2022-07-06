import React from 'react';
import s from "./Post.module.css"

const Post = (props) => {
  return <div className={s.item}>
    <img src="https://www.haddan.ru/@!images/sml/kino.gif"></img>
     {props.message} 
      <div><span>likes </span> 
      {props.likesCount}
      </div>
    </div>

}


export default Post;
