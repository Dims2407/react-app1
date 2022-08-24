import React from 'react';
import s from "./Post.module.css"

type PropsType = {
  message: string
  likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
  return <div className={s.item}>
    <img src="https://www.haddan.ru/@!images/sml/kino.gif"></img>
     {props.message} 
      <div><span>likes </span> 
      {props.likesCount}
      </div>
    </div>

}


export default Post;
