import React, { useEffect, useState } from "react";
import UserGroups from "./UserGroups";
import EditProfileForm from "./EditProfileForm";

const Profile = () => {
  const [user, setUser] = useState();
  const [errors, setErrors] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const default_img_url =
    "https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top";

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((userData) => {
          setUser(userData);
          setIsLoading(false);
        });
      } else {
        res.json().then((data) => setErrors(data.errors));
      }
    });
  }, []);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const onSubmitEdit = (updatedUser) => {
    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setUser(data);
          setEditMode(false);
        });
      } else {
        res.json().then((data) => setErrors(data.errors));
      }
    });
  };

  if (isLoading) return "Loading...";
  if (errors) return { errors };
  const { username, first_name, last_name, bio, image_url, groups } = user;
  return (
    <div
      className="divide-y-2 max-w-7xl  text-center"
    >
      <div className="text-center">
        <div className="overflow-hidden shadow-lg rounded-lg relative mb-1 mb-6 w-64 m-auto">
          <img
            alt={username}
            src={image_url ? image_url : default_img_url}
            className="rounded-lg"
          />
          <div className="absolute bg-gradient-to-b bg-opacity-60 from-transparent to-black w-full px-4 py-2 bottom-0">
            <p className="text-white text-2xl nb-4">{`${first_name} ${last_name}`}</p>
            <div className="flex justify-center">
              <p className="text-sm text-gray-300 flex items-center">{bio}</p>
            </div>
            <div
              className="flex justify-center cursor-pointer mt-1"
              onClick={handleEditClick}
            >
              <p class="text-sm text-gray-300 flex items-center">
                <svg
                  width="10"
                  height="10"
                  fill="currentColor"
                  class="h-4 w-4"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z"></path>
                </svg>
                Edit Profile
              </p>
            </div>
          </div>
        </div>
      </div>
      {editMode ? (
        <EditProfileForm
          onSubmitEdit={onSubmitEdit}
          user={user}
          errors={errors}
        />
      ) : (
        ""
      )}
      <h2 className="mt-6 text-3xl font-extrabold text-indigo-600 dark:text-white sm:text-4xl">
        <span className="block">Your Groups</span>
      </h2>
      <UserGroups groups={groups} />
    </div>
  );
};

export default Profile;
