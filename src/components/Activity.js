import { deleteRoutineActivity } from "../api";
import { useNavigate } from 'react-router-dom';

const Activity = ({activity, setActivity, token, creatorName, user}) => {
    const navigate = useNavigate();
    const destroyRoutineActivity = async (token, routineActivityId, routineId) => {
        try {
        const data = await deleteRoutineActivity(token, routineActivityId);
        navigate(`/routines/${routineId}`);
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h5>{activity.name}</h5>
            <p>{activity.description}</p>
            {
                activity.duration && activity.count ?   
                <ul>
                    <li>Duration: {activity.duration}</li>
                    <li>Count: {activity.count}</li>
                </ul>
                :
                null
            }
            {
                activity.routineActivityId && creatorName === user.username ?
                <button
                className="btn btn-link text-danger"
                onClick={() => destroyRoutineActivity(token, activity.routineActivityId, activity.routineId)}
                >
                Delete This Activity From Routine
                </button>
                :
                null
            }
        </div>
    )
}

export default Activity;