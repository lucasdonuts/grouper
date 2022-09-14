import React, { useState } from 'react';

const NewPostForm = ({ group, currentUser, onNewPost }) => {
  const [ errors, setErrors ] = useState([]);
  const [ formData, setFormData ] = useState({
    user_id: currentUser.id,
    group_id: '',
    text: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, text: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...formData, group_id: group.id})
    })
      .then( res => {
        if(res.ok){
          res.json().then( onNewPost )
        } else {
          res.json().then( data => setErrors( data.errors ))
        }
      })
  }

  return(
    <form onSubmit={ handleSubmit }>
      <label className="text-gray-700" htmlFor="name">
        <textarea
          onChange={ handleChange }
          className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          id="comment"
          placeholder="Post text"
          name="text"
          rows="5"
          cols="40"
        >
        </textarea>
      </label>
      <div className="col-span-2 text-right">
          <button type="submit" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
              Send
          </button>
      </div>
      { errors }
    </form>
  )
}

export default NewPostForm;