import React from "react";
import { NavLink, useHistory } from 'react-router-dom';

const NavBar = ({ currentUser, updateCurrentUser }) => {
  const history = useHistory();

  const handleLogOut = () => {
    fetch('/logout', {
      method: 'DELETE'
    })
    updateCurrentUser(false);
    history.push('/');
  }

  const noUserLinks = (
    <>
      <NavLink
        className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        to="/login">
          Log In
      </NavLink>
      <NavLink
        className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        to="/signup">
          Sign Up
      </NavLink>
    </>
  )

  const userLinks = (
    <div className="flex">
      <div className="flex-row gap-4 flex justify-center items-center">
        <div className=" flex flex-col">
            <NavLink
              to={ `/users/${currentUser.id}` }
              className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                { currentUser.username }
            </NavLink>
        </div>
    </div>
      <button
        className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        onClick={ handleLogOut }
      >
        Log Out
      </button>
    </div>
  )

  return (
    <div className="mb-6">
      <nav className="bg-white dark:bg-gray-800  shadow ">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className=" flex items-center">
              <NavLink className="flex-shrink-0" to="/">
                <img className="h-8 w-8" src="../Letter-G-icon.png" alt="Workflow" />
              </NavLink>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink
                    className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    to="/groups"
                  >
                    Browse Groups
                  </NavLink>
                  { currentUser ?
                    <NavLink
                      className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      to={ `/groups/new` }
                    >
                      Create a Group
                    </NavLink> :
                    ""
                  }
                </div>
              </div>
            </div>
            <div className="block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="ml-3 relative">
                  <div className="relative inline-block text-left">
                    <div>
                      { currentUser ? userLinks : noUserLinks }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="h-8 w-8"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
