import React, { useState } from "react";
import EditPostForm from './EditPostForm';

const default_img_url =
    "https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top";

const Post = ({ currentUser, post, onDeletePost }) => {
  const [ editMode, setEditMode ] = useState(false);
  const [ content, setContent ] = useState(post.text);
  const user = post.user;

  const handleDelete = () => {
    onDeletePost(post.id);
  }

  const userButtons = (
    <div className="mt-2">
      <button
        onClick={ () => setEditMode(!editMode) }
        className="mb-2 px-2 bg-blue-600 h-10 w-50 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
      >
        {editMode ? "Cancel" : "Edit Post"}
      </button>
      <button
        onClick={ handleDelete }
        className="mb-2 px-2 bg-red-600 h-10 w-50 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
      >
        Delete Post
      </button>
    </div>
  )

  const onEditPost = (editedPost) => {
    setEditMode(false);
    setContent(editedPost.text);
  }

  return (
    <div
      className="relative block p-8 overflow-hidden border border-gray-100 rounded-lg"
      // href=""
    >
      <span className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-indigo-600"></span>

      <div className="justify-center sm:flex">
        <div className="flex-shrink-0 hidden ml-3 sm:block">
          <img
            className="object-cover w-16 h-16 rounded-lg shadow-sm"
            src={ default_img_url }
            alt=""
          />
        </div>
        <div className="my-auto ml-2">
          <h5 className="text-xl font-bold text-gray-900">
            { user.username }
          </h5>
          <p className="text-xs text-gray-500">{ post.created_at }</p>
        </div>

        
      </div>

      <div className="mt-4 sm:pr-8">
        { editMode ?
          <EditPostForm post={ post } onEditPost={ onEditPost } /> :
          <p className="text-lg text-gray-500">
            { content }
          </p>
        }
        
      </div>
      { user.id === currentUser.id ? userButtons : "" }
    </div>
  );
};

export default Post;
