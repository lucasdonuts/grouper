import React from 'react';
import GroupCard from './GroupCard';

const UserGroups = ({ currentUser }) => {
  const groupCards = currentUser.groups.map( group => {
    return <GroupCard group={ group } />
  })
  return(
    <div>
      { groupCards }
    </div>
  )
}

export default UserGroups;