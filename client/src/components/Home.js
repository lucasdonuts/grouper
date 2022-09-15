import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-800 ">
      <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
          <span className="block">Welcome to Grouper</span>
        </h2>
        {/* <p className="text-xl mt-4 max-w-md mx-auto text-gray-400">
          I had noticed that both in the very poor and very rich extremes of
          society the mad were often allowed to mingle freely
        </p> */}
        <div className="lg:mt-0 lg:flex-shrink-0">
          <Link to="/signup" className="mt-12 inline-flex rounded-md">
            <button
              type="button"
              className="py-4 mx-4 px-6 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Sign Up
            </button>
          </Link>
          <Link to="/login" className="mt-12 inline-flex rounded-md">
            <button
              type="button"
              className="py-4 mx-4 px-6 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Log In
            </button>
          </Link>
          <Link to="/groups" className="mt-12 inline-flex rounded-md">
            <button
              type="button"
              className="py-4 mx-4 px-6 bg-gray-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Browse Groups
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
