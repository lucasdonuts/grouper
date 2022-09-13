import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Profile = ({ currentUser }) => {
  return(
    <div>
      <h1>{ currentUser ? currentUser.username : "Not Logged In" }</h1>
    </div>
  )
}

export default Profile;