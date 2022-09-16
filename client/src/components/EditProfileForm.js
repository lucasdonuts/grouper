import React, { useState } from "react";

const EditProfileForm = ({ user, onSubmitEdit, errors }) => {
  const [ formData, setFormData ] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    bio: user.bio,
    image_url: user.image_url
  });
  console.log(user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitEdit(formData);
  }

  return (
    <div className="flex flex-col m-auto max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
      <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
        Edit Your Profile
      </div>
      <div className="p-6 mt-8">
        <form onSubmit={handleSubmit} autocomplete="off">
          {/* First and last name */}
          <div className="flex gap-4 mb-2">
            <div className=" relative ">
              <input
                // required
                onChange={handleChange}
                type="text"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                name="first_name"
                placeholder="First Name"
                value={ formData.first_name }
              />
            </div>
            <div className=" relative ">
              <input
                required
                onChange={handleChange}
                type="text"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                name="last_name"
                placeholder="Last Name"
                value={ formData.last_name }
              />
            </div>
          </div>

          {/* Username */}
          <div className="flex flex-col mb-2">
            <div className=" relative ">
              <input
                required
                onChange={handleChange}
                type="text"
                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                name="username"
                placeholder="Username"
                value={ formData.username }
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="flex flex-col mb-2">
            <div className=" relative ">
              <input
                onChange={handleChange}
                type="text"
                name="image_url"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Profile Pic URL"
                value={ formData.image_url }
              />
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col mb-2">
            <div className=" relative ">
              <input
                onChange={handleChange}
                type="text"
                name="bio"
                className="h-40 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Tell us a little about yourself..."
                value={ formData.bio }
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="flex w-full my-4">
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Submit Changes
            </button>
          </div>
          <div className="col-span-2 text-center text-red-400 font-semibold">
            {errors}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
