import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Profile = ({ currentUser }) => {
  // const [ user, setUser ] = useState(currentUser);
  // const [ isLoading, setIsLoading ] = useState(true);
  // const [ errors, setErrors ] = useState(false);

  // const params = useParams();
  // const { id } = params;

  // useEffect( () => {
  //   fetch(`/users/${id}`)
  //   .then(res => {
  //     if(res.ok){
  //       res.json().then( user => {
  //         setUser(user);
  //         setIsLoading(false);
  //       })
  //     } else {
  //       res.json().then( data => setErrors( data.error ) )
  //     }
  //   })
  // }, [id])

  // if(isLoading) return <h1>Loading...</h1>
  // if(errors) return <h1>{ errors }</h1>
  return(
    <div>
      <h1>{ currentUser ? currentUser.username : "Not Logged In" }</h1>
    </div>
  )
}

export default Profile;