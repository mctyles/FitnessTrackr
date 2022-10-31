import { Link } from "react-router-dom";
import { deleteRoutine } from "../api";
import Activity from "./Activity";
import RoutineActivityForm from "./RoutineActivityForm";

const Routine = ({
  activities,
  setActivities,
  routine,
  setUserRoutines,
  token,
  user,
  setSuccessMsg
}) => {
  const routineActivities = routine.activities;
  const { creatorName } = routine;

  const destroyRoutine = async (token, routineId) => {
    try {
      const data = await deleteRoutine(token, routineId);
      setUserRoutines((prev) => prev.filter((routine) => routineId !== routine.id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="card m-3 p-3" id="routine-card">
      <div>
        <h3 className="card-title text-dark">{routine.name}</h3>
        <p className="card-subtitle text-muted">
          Created by: {routine.creatorName}
        </p>
        <h5 className="card-text text-dark mt-3">Goal: {routine.goal}</h5>
      </div>
      <hr />
      <div>
        <h4 className="text-dark">Routine Activities</h4>
        {routineActivities.map((activity) => (
          <Activity
            key={activity.id}
            activity={activity}
            creatorName={creatorName}
            token={token}
            user={user}
            setSuccessMsg={setSuccessMsg}
          />
        ))}
        {!routineActivities.length && (
          <p className="text-dark">No activities to display.</p>
        )}
      </div>
      {user && routine.creatorName === user.username ? (
        <>
          <hr />
          <h5 className="text-dark">Add Activity To Routine:</h5>
          <RoutineActivityForm
            activities={activities}
            setActivities={setActivities}
            routine={routine}
            token={token}
            setSuccessMsg={setSuccessMsg}
          />
        </>
      ) : null}
      <div>
        <Link className="btn btn-link" to={`/routines/${routine.id}`}>
          {user && routine.creatorName === user.username
            ? "View/Edit Routine"
            : "View Routine"}
        </Link>
        {user && routine.creatorName === user.username ? (
          <button
            className="btn btn-link text-danger"
            onClick={() => destroyRoutine(token, routine.id)}
          >
            Delete Routine
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default Routine;
