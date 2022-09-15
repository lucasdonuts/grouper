import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewPostForm from "./NewPostForm";
import PostList from "./PostList";

const GroupPage = ({ currentUser, updateCurrentUser }) => {
  const [group, setGroup] = useState({});
  const [isInGroup, setIsInGroup] = useState(false);
  const [postsToShow, setPostsToShow] = useState([]);
  const [errors, setErrors] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetch(`/groups/${params.id}`).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setGroup(data);
          getPosts(data.id);
          setIsInGroup(
            data.users.some((user) => user.username === currentUser.username)
          );
        });
      } else {
        res.json().then((data) => setErrors(data.errors));
      }
    });
  }, [currentUser]);

  const getPosts = (groupId) => {
    fetch("/posts").then((res) => {
      if (res.ok) {
        res.json().then((posts) => {
          setPostsToShow(posts.filter((post) => post.group_id === groupId));
        });
      } else {
        res.json().then((data) => {
          setErrors(data.errors);
        });
      }
    });
  };

  const handleJoinGroup = () => {
    fetch("/user_groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: currentUser.id,
        group_id: group.id,
      }),
    }).then((res) => {
      if (res.ok) {
        const user = { ...currentUser, groups: [...currentUser.groups, group] };
        updateCurrentUser(user);
        setIsInGroup(true);
      } else {
        console.log("Error Joining Group");
      }
    });
  };

  const handleLeaveGroup = () => {
    fetch(`/user_groups/${group.id}`, {
      method: "DELETE",
      // headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({
      //   users: group.users.filter( user => user.id !== currentUser.id )
      // })
    }).then((res) => {
      if (res.ok) {
        const user = {
          ...currentUser,
          groups: currentUser.groups.filter((g) => g.id !== group.id),
        };
        updateCurrentUser(user);
        setIsInGroup(false);
      } else {
        res.json().then((res) => console.log("Not Deleted"));
      }
    });
  };

  const onNewPost = (newPost) => {
    setPostsToShow([newPost, ...postsToShow]);
  };

  const onDeletePost = (postId) => {
    fetch(`/posts/${postId}`, {
      method: "DELETE",
    }).then(setPostsToShow(postsToShow.filter((post) => post.id !== postId)));
  };

  const joinGroupButton = (
    <button
      onClick={handleJoinGroup}
      type="button"
      className="mb-2 px-4 bg-blue-600 h-10 w-50 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
    >
      {/* { group.users.includes(currentUser) ? "Leave group" : "Join group" } */}
      Join Group
    </button>
  );

  const leaveGroupButton = (
    <button
      onClick={handleLeaveGroup}
      type="button"
      className="mb-2 px-4 bg-red-600 h-10 w-50 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
    >
      {/* { group.users.includes(currentUser) ? "Leave group" : "Join group" } */}
      Leave Group
    </button>
  );

  const loggedInComponents = (
    <div>
      {isInGroup ? leaveGroupButton : joinGroupButton}
      {isInGroup ? (
        <NewPostForm
          group={group}
          currentUser={currentUser}
          onNewPost={onNewPost}
        />
      ) : (
        ""
      )}
    </div>
  );
  
  return (
    <div className="text-center max-w-7xl">
      <div className="text-center m-auto">
        <section className="relative bg-white mb-4 max-h-[450px]">
          <img
            className="absolute inset-0 object-[75%] sm:object-[25%] object-cover w-full h-full opacity-25 sm:opacity-100"
            src={group.image_url}
            alt={group.name}
          />

          <div className="hidden sm:block sm:inset-0 sm:absolute sm:bg-gradient-to-r sm:from-white sm:to-transparent"></div>

          <div className="relative px-4 py-32 mx-auto max-w-screen-xl lg:items-center lg:flex">
            <div className="max-w-xl text-center sm:text-left">
              <h1 className="text-3xl font-extrabold sm:text-5xl">
                <strong className="font-extrabold text-rose-700 sm:block">
                  {group.name}
                </strong>
              </h1>

              <p className="max-w-lg mt-4 sm:leading-relaxed sm:text-xl">
                {group.description}
              </p>
            </div>
          </div>
        </section>
        <div className="mb-6">{currentUser ? loggedInComponents : ""}</div>
        <div>
          <PostList
            postsToShow={postsToShow}
            currentUser={currentUser}
            onDeletePost={onDeletePost}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupPage;

{
  /* <section className="relative bg-white">
  <img
    className="absolute inset-0 object-[75%] sm:object-[25%] object-cover w-full h-full opacity-25 sm:opacity-100"
    src={ group.image_url }
    alt={ group.name }
  />

  <div className="hidden sm:block sm:inset-0 sm:absolute sm:bg-gradient-to-r sm:from-white sm:to-transparent"></div>

  <div className="relative px-4 py-32 mx-auto max-w-screen-xl lg:h-screen lg:items-center lg:flex">
    <div className="max-w-xl text-center sm:text-left">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        <strong className="font-extrabold text-rose-700 sm:block">
          { group.name }
        </strong>
      </h1>

      <p className="max-w-lg mt-4 sm:leading-relaxed sm:text-xl">
        { group.description }
      </p>

      <div className="flex flex-wrap mt-8 text-center gap-4">
        <a className="block w-full px-12 py-3 text-sm font-medium text-white rounded shadow bg-rose-600 sm:w-auto active:bg-rose-500 hover:bg-rose-700 focus:outline-none focus:ring" href="/get-started">
          Get Started
        </a>

        <a className="block w-full px-12 py-3 text-sm font-medium bg-white rounded shadow text-rose-600 sm:w-auto hover:text-rose-700 active:text-rose-500 focus:outline-none focus:ring" href="/about">
          Learn More
        </a>
      </div>
    </div>
  </div>
</section> */
}
