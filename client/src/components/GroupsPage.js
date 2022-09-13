import React, { useState, useEffect } from 'react';

const GroupsPage = ({ currentUser }) => {
  const [ userGroups, setUserGroups ] = useState([]);
  const [ groups, setGroups ] = useState([]);
  const [ errors, setErrors ] = useState([]);

  const updateUserGroups = (groupData) => {
    console.log("Groups: ", groupData)
    console.log("UserGroups: ", currentUser.groups)
  }

  useEffect( () => {
    fetch('/groups')
      .then( res => {
        if(res.ok){
          res.json().then( groupData => {
            setGroups(groupData);
          } )
        } else {
          res.json().then( data => {
            setErrors(data.errors)
          })
        }
      })
  }, [])

  return(
    <div></div>
  )
}

export default GroupsPage;