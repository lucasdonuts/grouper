import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewPostForm from './NewPostForm';
import PostList from './PostList';

const GroupPage = ({ currentUser, updateCurrentUser }) => {
  const [ group, setGroup ] = useState({});
  const [ isInGroup, setIsInGroup ] = useState(false);
  const [ postsToShow, setPostsToShow ] = useState([]);
  const [ errors, setErrors ] = useState([]);
  const params = useParams();
  // console.log("Current User: ", currentUser);
  // console.log("Group Users: ", group.users);
  // console.log("Some: ", group.users.some(user => user.username === currentUser.username))
  
  useEffect( () => {
    fetch(`/groups/${params.id}`)
      .then( res => {
        if(res.ok){
          res.json().then(data => {
            setGroup(data);
            getPosts(data.id);
            setIsInGroup(data.users.some(user => user.username === currentUser.username))
            console.log(data.users.filter(user => user.id !== currentUser.id))
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
          setIsInGroup(true);
        } else {
          console.log("Error Joining Group")
        }
      })
  }

  const handleLeaveGroup = () => {
    fetch(`/user_groups/${group.id}`, {
      method: 'DELETE'
      // headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({
      //   users: group.users.filter( user => user.id !== currentUser.id )
      // })
    })
      .then( res => {
        if(res.ok){
          const user = { ...currentUser, groups: currentUser.groups.filter(g => g.id !== group.id )}
          updateCurrentUser(user);
          setIsInGroup(false);
        } else {
          res.json().then(res => console.log("Not Deleted"))
        }
      })
  }

  const onNewPost = (newPost) => {
    setPostsToShow([newPost, ...postsToShow])
  }

  const onDeletePost = (postId) => {
    fetch(`/posts/${postId}`, {
      method: 'DELETE'
    })
      .then(setPostsToShow(postsToShow.filter(post => post.id !== postId )))

  }

  const joinGroupButton = (
    <button
      onClick={ handleJoinGroup }
      type="button"
      className="mb-2 px-4 bg-blue-600 h-10 w-50 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
        {/* { group.users.includes(currentUser) ? "Leave group" : "Join group" } */}
        Join Group
    </button>
  )

  const leaveGroupButton = (
    <button
      onClick={ handleLeaveGroup }
      type="button"
      className="mb-2 px-4 bg-blue-600 h-10 w-50 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
        {/* { group.users.includes(currentUser) ? "Leave group" : "Join group" } */}
        Leave Group
    </button>
  )

  const loggedInComponents = (
    <div>
      { isInGroup ? leaveGroupButton : joinGroupButton }
      { isInGroup ? <NewPostForm group={ group } currentUser={ currentUser } onNewPost={ onNewPost } /> : "" }
    </div>
  )

  return(
    <div className="text-center max-w-7xl">
      <div className="text-center m-auto">
        <div>
          <h1 className="text-2xl">{ group.name }</h1>
        </div>
        <div className="mb-6">
          { currentUser ? loggedInComponents : "" }
        </div>
        <div>
          <PostList postsToShow={ postsToShow } currentUser={ currentUser } onDeletePost={ onDeletePost } />
        </div>
      </div>
    </div>
  )
}

export default GroupPage;