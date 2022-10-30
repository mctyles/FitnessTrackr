import { Link } from 'react-router-dom';
import { deleteRoutine } from '../api';
import Activity from './Activity';
import RoutineActivityForm from './RoutineActivityForm';

const Routine = ({activities, setActivities, routine, setRoutines, token, user}) => {
    
    const routineActivities = routine.activities;
    const { creatorName } = routine;
    console.log(routine);

    const destroyRoutine = async (token, routineId) => {
        try {
        const data = await deleteRoutine(token, routineId);
        setRoutines((prev) => prev.filter((routine) => routineId !== routine.id));
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <section className="card m-3 p-3" id="routine-card">
            <div>
                <h3 className="card-title text-dark">{routine.name}</h3>
                <p className="card-subtitle text-muted">Created by: {routine.creatorName}</p>
                <p className="card-text text-dark">Goal: {routine.goal}</p>
            </div>
            <hr/>
            <div>
                <h4 className="text-dark">Routine Activities</h4>
                {
                    routineActivities.map(activity => <Activity key={activity.id} activity={activity} creatorName={creatorName} token={token} user={user}/>)
                }
                {
                    !routineActivities.length && <p className='text-dark'>No activities to display.</p>
                }   
            </div>
            <Link className="btn btn-link" to={`/routines/${routine.id}`}>
                View Routine
            </Link>
            {user && routine.creatorName === user.username ? (
                <button
                className="btn btn-link text-danger"
                onClick={() => destroyRoutine(token, routine.id)}
                >
                Delete Routine
                </button>
            )
        :
        null
        }
            {user && routine.creatorName === user.username ?
                <>
                    <hr/>
                    <h5 className='text-dark'>Add Activity To Routine:</h5>
                    <RoutineActivityForm activities={activities} setActivities={setActivities} routine={routine} token={token}/> 
                </>
                :
            null
            }
        </section>
    )
}

export default Routine;