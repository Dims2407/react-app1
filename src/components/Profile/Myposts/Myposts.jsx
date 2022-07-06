import React from 'react';
import s from "./Myposts.module.css"
import Post from './Post/Post';



const Myposts = (props) => {


  let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />)

  let NewPostElement = React.createRef();

  let onaddPost = () => {
    props.addPost();
   
  }

  let onPostChange = () => {
    let text = NewPostElement.current.value;
    props.updateNewPostText(text);
  }

  return <div className={s.posts}>
    <h3>My posts</h3>
    <div>New Posts</div>
    <div>
      <button onClick={onaddPost}>Add New</button>
      <button>Remove</button>
    </div>
    <div>
      <textarea value={props.newPostText}
      onChange={onPostChange}
      ref={NewPostElement}
      placeholder='Enter your message'></textarea>
      
    </div>
    <div>
      {postsElements}
    </div>

  </div >

}

export default Myposts;