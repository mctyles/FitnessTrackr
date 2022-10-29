import {useParams} from 'react-router-dom';
import Activity from './Activity';

const SingleRoutine = ({ routines }) => {
    
    const { routineId } = useParams();
    console.log(routineId);
    console.log(routines);
    const routine = routines.find((routine) => routine.id === Number(routineId));
    console.log(routine);
    const { activities } = routine;
    
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
                    activities.map(activity => <Activity key={activity.id} activity={activity}/>)
                }
                {
                    !activities.length && <p>No activities to display.</p>
                }   
            </div>
        </>
    )
}

export default SingleRoutine;