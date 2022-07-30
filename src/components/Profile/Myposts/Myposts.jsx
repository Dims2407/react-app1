import React from 'react';
import s from "./Myposts.module.css"
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utilities/validators/validators";
import {Textarea} from "../../common/controlforms/FormsControls";

const maxLength10 = maxLengthCreator(10)

let AddNewPostForm = (props) => {
  return (
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field component={Textarea} name="newPostText" placeholder="Enter your message" validate={[required, maxLength10]} />
        </div>
        <div>
          <button>Add post</button>
        </div>
      </form>
  )
}

const AddNewPostFormRedux = reduxForm({form: 'profileAddNewPostForm'})(AddNewPostForm)

const Myposts = (props) => {


  let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />)



  let onaddPost = (values) => {
    props.addPost(values.newPostText);
   
  }


  return <div>
    <h3>My posts</h3>
    <div>New Posts</div>
    <AddNewPostFormRedux onSubmit={onaddPost} />
    <div>
      {postsElements}
    </div>
  </div >
}




export default Myposts;