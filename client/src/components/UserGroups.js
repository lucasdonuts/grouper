import React from 'react';
import GroupCard from './GroupCard';

const UserGroups = ({ groups }) => {

  const groupCards = groups.map( group => {
    return <GroupCard key={ group.id } group={ group } />
  })

  return(
    <div className="w-full bg-white p-12">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-12">
        {groupCards}
      </div>
    </div>
  )
}

export default UserGroups;