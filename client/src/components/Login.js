import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

const Login = ({ updateCurrentUser }) => {
  const [ formData, setFormData ] = useState({});
  const [ errors, setErrors ] = useState([]);
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  console.log(formData)
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if(res.ok){
          res.json().then(user => {
            updateCurrentUser(user);
            history.push(`/users/${user.id}`);
          })
        } else {
          res.json().then( data => setErrors(data.errors) );
        }
      })
  }

  return (
    <div className="flex flex-col w-full m-auto max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
      <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
        Login To Your Account
      </div>
      <div className="mt-8">
        <form onSubmit={ handleSubmit } autoComplete="off">
          <div className="flex flex-col mb-2">
            <div className="flex relative ">
              <input
                required
                onChange={ handleChange }
                name="username"
                type="text"
                className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Username"
              />
            </div>
          </div>
          <div className="flex flex-col mb-6">
            <div className="flex relative ">
              <input
                required
                onChange={ handleChange }
                name="password"
                type="password"
                className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="flex items-center mb-6 -mt-4">
          </div>
          <div className="flex w-full">
            <button
              type="submit"
              className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Login
            </button>
          </div>
        </form>
        { errors ? <div>{ errors }</div> : null }
      </div>
      <div className="flex items-center justify-center mt-6">
        {/* <a
          href="#"
          target="_blank"
          className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
        >
          <span className="ml-2">You don&#x27;t have an account?</span>
        </a> */}
      </div>
    </div>
  );
};

export default Login;
