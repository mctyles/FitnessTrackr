import {useParams, Link} from 'react-router-dom';
import { useState } from 'react';
import Activity from './Activity';
import EditRoutine from './EditRoutine';
import { deleteRoutine } from '../api';

const SingleRoutine = ({ routines, user, token, setRoutines, userRoutines }) => {
    const [editRoutineActive, setEditRoutineActive] = useState(false);

    const { routineId } = useParams();
    console.log(routineId);
    console.log(routines);
    let routine = routines.find((routine) => routine.id === Number(routineId));
    if (!routine) {
        routine = userRoutines.find((routine) => routine.id === Number(routineId));
    }
    console.log(routine);
    const { activities } = routine;
    
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
        {
            !editRoutineActive ?
            <section className="card m-3 p-3" id="routine-card">
                <div>
                    <h3 className="card-title text-dark">{routine.name}</h3>
                    <p className="card-subtitle text-muted">Created by: {routine.creatorName}</p>
                    <p className="card-text text-dark">Goal: {routine.goal}</p>
                </div>
                <hr/>
                <div>
                    <h4 className='text-dark'>Routine Activities</h4>
                    {
                        activities.map(activity => <Activity key={activity.id} activity={activity}/>)
                    }
                    {
                        !activities.length && <p>No activities to display.</p>
                    }
                    
                </div>
                <Link to="/routines" className="btn btn-link text-info">Back to routines</Link>
                    { user && routine.creatorName === user.username ?
                    <button className="btn btn-link text-info" onClick={() => setEditRoutineActive(!editRoutineActive)}>Edit Routine</button>
                    :
                    null
                    }
                    {
                    user && routine.creatorName === user.username ? (
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
            </section>
            :
            <EditRoutine routine={routine} setEditRoutineActive={setEditRoutineActive} token={token}/>
            }
        </>
    )
}

export default SingleRoutine;