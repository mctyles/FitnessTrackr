import { useState, useEffect } from "react";
import { fetchActivities } from "../api";
import Activity from "./Activity";
import CreateActivityForm from "./CreateActivityForm";

const Activities = ({ activities, setActivities, token }) => {
  const [createActivityActive, setCreateActivityActive] = useState(false);

  useEffect(() => {
    const getActivities = async () => {
      const activities = await fetchActivities();
      setActivities(activities);
    };
    getActivities();
  }, []);

  return (
    <div>
      <h1 className="mt-3 ml-3">Activities</h1>
      {
        token &&
      <button
        className="mt-3 ml-3 align-self-start btn btn-outline-light"
        onClick={() => {
          setCreateActivityActive(!createActivityActive);
        }}
      >
        {!createActivityActive
          ? "Create New Activity"
          : "Hide New Activity Form"}
      </button>
    }
      {createActivityActive && (
        <CreateActivityForm setActivities={setActivities} token={token} />
      )}
      {activities.map((activity) => {
        return (
          <Activity
            key={activity.id}
            activity={activity}
            setActivities={setActivities}
            token={token}
          />
        );
      })}
    </div>
  );
};

export default Activities;
