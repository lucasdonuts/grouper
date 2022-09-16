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
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-12">
        { groupCards }
        { errors }
      </div>
    </div>
  );
};

export default GroupsList;
