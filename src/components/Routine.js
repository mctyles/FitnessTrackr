import { Link } from 'react-router-dom';
import { deleteRoutine } from '../api';
import Activity from './Activity';
import RoutineActivityForm from './RoutineActivityForm';

const Routine = ({activities, setActivities, routine, setRoutines, token, user}) => {
    
    const routineActivities = routine.activities;

    const destroyRoutine = async (token, routineId) => {
        try {
        const data = await deleteRoutine(token, routineId);
        setRoutines((prev) => prev.filter((routine) => routineId !== routine.id));
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <>
            <div>
                <h5 className="card-header">{routine.name}</h5>
                <div className="card-body">
                    <p className="card-title">Created by: {routine.creatorName}</p>
                    <p className="card-title">Goal: {routine.goal}</p>
                </div>
            </div>
            <div>
                <h4>Activities</h4>
                {
                    routineActivities.map(activity => <Activity key={activity.id} activity={activity}/>)
                }
                {
                    !routineActivities.length && <p>No activities to display.</p>
                }   
            </div>
            <Link className="btn btn-link" to={`/routines/${routine.id}`}>
                View Routine
            </Link>
            {routine.creatorName === user.username && (
                <button
                className="btn btn-link text-danger"
                onClick={() => destroyRoutine(token, routine.id)}
                >
                Delete
                </button>
            )}
            {routine.creatorName === user.username && (
                <RoutineActivityForm activities={activities} setActivities={setActivities} routine={routine} token={token}/>
            )}
        </>
    )
}

export default Routine;