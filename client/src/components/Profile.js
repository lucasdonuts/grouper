import React, { useEffect, useState } from 'react';
import UserGroups from './UserGroups';

// Default Profile image_url: https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top
const Profile = () => {
  const [ user, setUser ] = useState();
  const [ errors, setErrors ] = useState();
  const [ isLoading, setIsLoading ] = useState(true);
  const default_img_url = "https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top"
  
  useEffect( () => {
    fetch('/me')
      .then( res => {
        if(res.ok){
          res.json().then(userData => {
            setUser(userData);
            setIsLoading(false);
          })
        } else {
          res.json().then( data => setErrors( data.errors ))
        }
      })
  }, [])

  if(isLoading) return "Loading..."
  if(errors) return { errors }
  const { username, first_name, last_name, bio, image_url, groups } = user

  return(
    <div className="max-w-7xl mx-auto">
      <div className="text-center">
        <div className="m-auto w-32 flex justify-between">
          <img
            alt="profile-pic"
            src={ image_url ? image_url : default_img_url }
            className="mx-auto object-cover rounded-lg h-16 w-16"
          />
          <h1 className="my-auto text-2xl">{ user ? username : "Not Logged In" }</h1>
        </div>
      </div>
      <UserGroups groups={ groups } />
    </div>
  )
}

export default Profile;