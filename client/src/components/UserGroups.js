import React, { useEffect } from 'react';
import GroupCard from './GroupCard';

const UserGroups = ({ groups }) => {

  const groupCards = groups.map( group => {
    return <GroupCard key={ group.id } group={ group } />
  })

  return(
    <div>
      { groupCards }
    </div>
  )
}

export default UserGroups;