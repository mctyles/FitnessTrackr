import { Link } from 'react-router-dom';
import Activity from './Activity';

const Routine = ({routine, setRoutines, token}) => {
    
    const { activities } = routine;

    return (
        <>
            <div className="card my-3">
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
            </div>
        </>
    )
}

export default Routine;