import React from "react";
import { Link } from 'react-router-dom';

// Default Group Image: http://sharedsuccessglobal.com/marketplace/upload/photos/d-group.jpg
const GroupCard = ({ group }) => {
  const defaultImgSrc="http://sharedsuccessglobal.com/marketplace/upload/photos/d-group.jpg"

  return (
    <div class="w-80 overflow-hidden shadow-lg rounded-lg cursor-pointer">
      <Link to={ `groups/${group.id}` } class="w-full block h-full">
        <img
          alt={ group.name }
          src={ group.image_url ? group.image_url : defaultImgSrc }
          class="max-h-40 w-full object-cover"
        />
        <div class="bg-white dark:bg-gray-800 w-full p-4">
          <p class="text-indigo-500 text-md font-medium"></p>
          <p class="text-gray-800 dark:text-white text-xl font-medium mb-2">
            { group.name }
          </p>
          <p class="text-gray-400 dark:text-gray-300 font-light text-md">
            { group.description }
          </p>
        </div>
      </Link>
    </div>
  );
};

export default GroupCard;
