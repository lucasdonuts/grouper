import React, { useState } from "react";
import { useHistory, Link } from 'react-router-dom';

const NewUser = ({ updateCurrentUser }) => {
  const [ errors, setErrors ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ formData, setFormData ] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    password_confirmation: "",
    image_url: "",
    bio: ""
  });

  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);

    fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify(formData)
    })
      .then( res => {
        if(res.ok){
          res.json().then(user => {
            updateCurrentUser(user);
            history.push(`/users/${user.id}`)
          })
        } else {
          res.json().then(data => setErrors(data.errors))
        }
      })
  }
  if(isLoading) return "Loading..."
  return (
    <div className="flex flex-col m-auto max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
      <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
        Create a new account
      </div>
      <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
        Already have an account?
        <Link
          to="/login"
          className="ml-3 text-sm text-blue-500 underline hover:text-blue-700"
        >
          Sign in
        </Link>
      </span>
      <div className="p-6 mt-8">
        <form onSubmit={ handleSubmit }>
          {/* First and last name */}
          <div className="flex gap-4 mb-2">
            <div className=" relative ">
              <input
                // required
                onChange={ handleChange }
                type="text"
                id="create-account-first-name"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                name="first_name"
                placeholder="First Name"
              />
            </div>
            <div className=" relative ">
              <input
                required
                onChange={ handleChange }
                type="text"
                id="create-account-last-name"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                name="last_name"
                placeholder="Last Name"
              />
            </div>
          </div>

          {/* Username */}
          <div className="flex flex-col mb-2">
            <div className=" relative ">
              <input
                required
                onChange={ handleChange }
                type="text"
                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                name="username"
                placeholder="Username"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col mb-2">
            <div className=" relative ">
              <input
                required
                onChange={ handleChange }
                type="password"
                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                name="password"
                placeholder="Password"
              />
            </div>
          </div>
          
          {/* Password confirmation */}
          <div className="flex flex-col mb-2">
            <div className=" relative ">
              <input
                required
                onChange={ handleChange }
                type="password"
                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                name="password_confirmation"
                value={formData.password_confirmation}
                placeholder="Confirm Password"
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="flex flex-col mb-2">
            <div className=" relative ">
              <input
                onChange={ handleChange }
                type="text"
                name="image_url"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Profile Pic URL"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col mb-2">
            <div className=" relative ">
              <input
                onChange={ handleChange }
                type="text"
                name="bio"
                className="h-40 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Tell us a little about yourself..."
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="flex w-full my-4">
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Login
            </button>
          </div>
          <div className="col-span-2 text-center text-red-400 font-semibold">
            { errors }
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewUser;