import { useState } from "react";
import { addRoutine } from "../api";

const CreateRoutineForm = ({ setUserRoutines, token }) => {
  const [routineName, setRoutineName] = useState("");
  const [routineGoal, setRoutineGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const newRoutine = await addRoutine(
        token,
        routineName,
        routineGoal,
        isPublic
      );
      setUserRoutines((prev) => [newRoutine, ...prev]);
      setRoutineName("");
      setRoutineGoal("");
      setIsPublic(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p5">
      {token && (
        <form
          className="d-flex flex-column align-items-start m-3"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={routineName}
            onChange={(event) => setRoutineName(event.target.value)}
          />
          <label className="mt-2" htmlFor="goal">
            Goal:
          </label>
          <textarea
            type="text"
            name="goal"
            className="form-control"
            value={routineGoal}
            onChange={(event) => setRoutineGoal(event.target.value)}
          />
          <div className="d-flex flex-column align-items-start">
            <label className="mt-2" htmlFor="public-option">
              Check box for public routine to be visible to all users:
            </label>
            <input
              type="checkbox"
              name="public-option"
              id="public-checkbox"
              onChange={(event) => {
                if (event.target.checked) {
                  setIsPublic(true);
                } else {
                  setIsPublic(false);
                }
              }}
            />
          </div>
          <button className="btn btn-outline-light mt-3" type="submit">
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateRoutineForm;
