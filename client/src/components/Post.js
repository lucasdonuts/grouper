import React from "react";

const Post = ({ post }) => {
  const default_img_url =
    "https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top";
  const user = post.user;

  return (
    <a
      className="relative block p-8 overflow-hidden border border-gray-100 rounded-lg"
      href=""
    >
      <span className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

      <div className="justify-center sm:flex">
        <div className="flex-shrink-0 hidden ml-3 sm:block">
          <img
            className="object-cover w-16 h-16 rounded-lg shadow-sm"
            src={ default_img_url }
            alt=""
          />
        </div>
        <div className="my-auto ml-2">
          <h5 className="text-xl font-bold text-gray-900">
            { user.username }
          </h5>
          <p className="text-xs text-gray-500">{ post.created_at }</p>
        </div>

        
      </div>

      <div className="mt-4 sm:pr-8">
        <p className="text-lg text-gray-500">
          { post.text }
        </p>
      </div>
    </a>
  );
};

export default Post;
