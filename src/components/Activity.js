import { useState } from "react";
import { deleteRoutineActivity } from "../api";
import { useNavigate } from 'react-router-dom';

import EditRoutineActivity from "./EditRoutineActivity";

const Activity = ({activity, token, creatorName, user, setSuccessMsg}) => {
    const [editActivityActive, setEditActivityActive] = useState(false);
    
    const navigate = useNavigate();
    const destroyRoutineActivity = async (token, routineActivityId) => {
        try {
        const data = await deleteRoutineActivity(token, routineActivityId);
        setSuccessMsg('Routine Activity successfully deleted.')
        navigate('/');
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div className="card m-3">
            <h5 className=" card-title text-dark">Activity: {activity.name}</h5>
            <p className="card-text text-dark">Description: {activity.description}</p>
            {
                !editActivityActive && activity.duration && activity.count ?   
                <ul className="text-dark">
                    <li className="text-dark">Duration: {activity.duration}</li>
                    <li className="text-dark">Count: {activity.count}</li>
                </ul>
                :
                null
            }
            {
                editActivityActive && activity.duration && activity.count ?
                <EditRoutineActivity activity={activity} token={token} setEditActivityActive={setEditActivityActive} setSuccessMsg={setSuccessMsg}/> :
                null
            }
            <div>
                {
                    user && activity.routineActivityId && creatorName === user.username ?
                    <button
                    className="btn btn-link text-danger"
                    onClick={() => destroyRoutineActivity(token, activity.routineActivityId, activity.routineId)}
                    >
                    Delete This Activity From Routine
                    </button>
                    :
                    null
                }
                {
                    user && activity.routineActivityId && creatorName === user.username ?
                    <button
                    className="btn btn-link"
                    onClick={() => setEditActivityActive(!editActivityActive)}
                    >
                    {
                    !editActivityActive ? 'Edit Routine Activity' : 'Cancel Edit'
                    }
                    </button>
                    :
                    null
                }
            </div>
        </div>
    )
}

export default Activity;