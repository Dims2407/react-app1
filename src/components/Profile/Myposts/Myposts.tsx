import React from 'react';
import Post from './Post/Post';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utilities/validators/validators";
import {CreateField, GetStringKeys, Input, Textarea} from "../../common/controlforms/FormsControls";
import {PostType} from "../../../Types/types";


const maxLength10 = maxLengthCreator(10)

type PropsType = {

}

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

type AddPostFormValuesType = {
    newPostText: string
}


let AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType & PropsType>> = (props) => {
  return (
      <form onSubmit={props.handleSubmit}>
        <div>
            {CreateField<AddPostFormValuesTypeKeys>("Enter Your Post", "newPostText", [required], Textarea)}
          {/*<Field  component={Textarea} name="newPostText" placeholder="Enter your message" validate={[required, maxLength10]} />*/}
        </div>
        <div>
          <button>Add post</button>
        </div>
      </form>
  )
}
const AddNewPostFormRedux = reduxForm<AddPostFormValuesType, PropsType>({form: 'profileAddNewPostForm'})(AddNewPostForm)


type PostsPropsType = {
    posts: Array<PostType>
    addPost: (newPostText:string) => void
}

const Myposts: React.FC<PostsPropsType> = props => {

    let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />)

    let onaddPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostText);
   
  }
  return (
    <div>
    <h3>My posts</h3>
    <div>New Posts</div>
    <AddNewPostFormRedux onSubmit={onaddPost} />
    <div>
      {postsElements}
    </div>
  </div >
)
}




export default Myposts;