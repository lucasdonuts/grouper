import React from "react";
import { Link } from 'react-router-dom';

const GroupCard = ({ group }) => {
  const defaultImgSrc="http://sharedsuccessglobal.com/marketplace/upload/photos/d-group.jpg"

  return (
    <div className="w-80 overflow-hidden shadow-lg rounded-lg cursor-pointer">
      <Link to={ `/groups/${group.id}` } className="w-full block h-full">
        <img
          alt={ group.name }
          src={ group.image_url ? group.image_url : defaultImgSrc }
          className="max-h-40 w-full object-cover"
        />
        <div className="bg-white dark:bg-gray-800 w-full p-4">
          <p className="text-indigo-500 text-md font-medium"></p>
          <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
            { group.name }
          </p>
          <p className="text-gray-400 dark:text-gray-300 font-light text-md">
            { group.description }
          </p>
        </div>
      </Link>
    </div>
  );
};

export default GroupCard;
