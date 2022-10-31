import { useState } from "react";
import { updateRoutineActivity } from "../api";

const EditRoutineActivity = ({activity, token, setEditActivityActive, setSuccessMsg}) => {
  const [count, setCount] = useState(`${activity.count}`);
  const [duration, setDuration] = useState(`${activity.duration}`);
  
  const handleSubmit = async (event) => {
    try {
        event.preventDefault()
        const editedRoutineActivity = await updateRoutineActivity(token, activity.routineActivityId, count, duration);
        setEditActivityActive(false);
    } catch(err) {
        console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="text-dark" htmlFor="duration">
        Duration:
      </label>
      <input
        type="text"
        name="duration"
        className="form-control"
        value={duration}
        onChange={(event) => setDuration(event.target.value)}
      />
      <label className="mt-3 text-dark" htmlFor="count">
        Count:
      </label>
      <input
        type="text"
        name="count"
        className="form-control"
        value={count}
        onChange={(event) => setCount(event.target.value)}
      />
      <button className="mt-2 btn btn-outline-dark" type="submit">
        Submit Changes
      </button>
    </form>
  )
};

export default EditRoutineActivity;
