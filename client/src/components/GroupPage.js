import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewPostForm from './NewPostForm';
import PostList from './PostList';

const GroupPage = ({ currentUser, updateCurrentUser }) => {
  const [ group, setGroup ] = useState({});
  const [ postsToShow, setPostsToShow ] = useState([]);
  const [ errors, setErrors ] = useState([]);
  const params = useParams();

  useEffect( () => {
    fetch(`/groups/${params.id}`)
      .then( res => {
        if(res.ok){
          res.json().then(data => {
            setGroup(data);
            getPosts(data.id);
          })
        } else {
          res.json().then( data => setErrors(data.errors) )
        }
      })
  }, []);

  const getPosts = (groupId) => {
    fetch('/posts')
      .then( res => {
        if(res.ok){
          res.json().then(posts => {
            setPostsToShow(posts.filter( post => post.group_id === groupId ))
          })
        } else {
          res.json().then(data => {
            setErrors(data.errors);
          })
        }
      })
  }

  const handleJoinGroup = () => {
    fetch('/user_groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: currentUser.id,
        group_id: group.id
      })
    })
      .then( res => {
        if(res.ok){
          const user = {...currentUser, groups: [...currentUser.groups, group]}
          updateCurrentUser(user);
        } else {
          console.log("Error Joining Group")
        }
      })
  }

  const onNewPost = (newPost) => {
    setPostsToShow([newPost, ...postsToShow])
  }

  const loggedInComponents = (
    <div>
      <button
        onClick={ handleJoinGroup }
        type="button"
        className="px-4 bg-blue-600 h-10 w-50 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
          {/* { group.users.includes(currentUser) ? "Leave group" : "Join group" } */}
          Join Group
      </button>
      <div>
        <NewPostForm group={ group } currentUser={ currentUser } onNewPost={ onNewPost } />
      </div>
    </div>
  )

  return(
    <div className="text-center max-w-7xl">
      <div className="text-center m-auto">
        <div className="mb-3">
          <h1 className="text-2xl">{ group.name }</h1>
        </div>
        <div>
          { currentUser ? loggedInComponents : "" }
        </div>
        <div>
          <PostList postsToShow={ postsToShow } />
        </div>
      </div>
    </div>
  )
}

export default GroupPage;