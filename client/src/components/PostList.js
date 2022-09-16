import React from 'react';
import Post from './Post';

const PostList = ({ postsToShow, currentUser, onDeletePost }) => {

  const postComponents = postsToShow.map( post => {
    return <Post key={ post.id } post={ post } currentUser={ currentUser } onDeletePost={ onDeletePost } />
  })

  return(
    <div>
      { postComponents }
    </div>
  )
}

export default PostList;