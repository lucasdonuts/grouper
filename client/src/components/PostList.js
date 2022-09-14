import React, { useState, useEffect } from 'react';
import Post from './Post';

const PostList = ({ postsToShow, currentUser, onDeletePost }) => {
  // const [ postsToShow, setPostsToShow ] = useState([]);

  // useEffect( () => {
  //   fetch('/posts')
  //     .then( res => {
  //       if(res.ok){
  //         res.json().then(posts => {
  //           setPostsToShow(posts.filter( post => post.group_id === groupId ))
  //         })
  //       }
  //     })
  // }, [])

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