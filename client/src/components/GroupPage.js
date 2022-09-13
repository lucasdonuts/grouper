import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GroupPage = ({ currentUser, updateCurrentUser }) => {
  const [ group, setGroup ] = useState({});
  const [ errors, setErrors ] = useState([]);
  const params = useParams();

  useEffect( () => {
    fetch(`/groups/${params.id}`)
      .then( res => {
        if(res.ok){
          res.json().then(setGroup)
        } else {
          res.json().then( data => setErrors(data.errors) )
        }
      })
  }, [])

  console.log(group);

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

  return(
    <div>
      <button
        onClick={ handleJoinGroup }
        type="button"
        className="py-4 px-6  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
          Join This Group
      </button>
    </div>
  )
}

export default GroupPage;