import React, { useState, useEffect } from "react";
import GroupCard from "./GroupCard";

const GroupsList = () => {
  const [groups, setGroups] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch("/groups").then((res) => {
      if (res.ok) {
        res.json().then((groupData) => {
          setGroups(groupData);
        });
      } else {
        res.json().then((data) => {
          setErrors(data.errors);
        });
      }
    });
  }, []);

  const groupCards = groups.map((group) => {
    return <GroupCard key={group.id} group={group} />;
  });

  return (
    <div className="w-full bg-white p-12">
      <div className="header flex items-end justify-between mb-12">
        {/* <div className="text-end">
          <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
            <div className=" relative ">
              <input
                type="text"
                id='"form-subscribe-Search'
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter a title"
              />
            </div>
            <button
              className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
              type="submit"
            >
              Search
            </button>
          </form>
        </div> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-12">
        { groupCards }
      </div>
    </div>
  );
};

export default GroupsList;
