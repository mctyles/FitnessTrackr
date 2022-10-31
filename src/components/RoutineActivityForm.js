import { useState, useEffect } from 'react';
import { addActivityToRoutine, fetchActivities } from '../api';
import { useNavigate } from 'react-router-dom'

const RoutineActivityForm = ({activities, setActivities, routine, token, setSuccessMsg}) => {
    
    const [count, setCount] = useState('');
    const [duration, setDuration] = useState('');
    const [activityId, setActivityId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const getActivities = async () => {
            const activities = await fetchActivities();
            setActivities(activities);
        }
        getActivities();
    } , []);
    
    const handleSubmit = async (event) => {
        
        try {
            event.preventDefault()
            const newRoutineActivity = await addActivityToRoutine(token, routine.id, activityId, count, duration);
            setCount("");
            setDuration("");
            setSuccessMsg(`Routine Activity has sucessfully been added to ${routine.name}`)
            navigate('/')
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div>
        {
            token &&
                <form 
                className="d-flex flex-column align-items-start m-3"
                onSubmit={handleSubmit}
                >
                    <label className="text-dark" htmlFor="activities">Select an activity to add:</label>
                    <select className="text-dark p-1" id="activities" name="activities" onChange={(event) => setActivityId(event.target.value)}>
                        {
                            activities.map((activity, idx) => <option key = {idx} value={activity.id}>{activity.name}</option>)
                        }
                    </select>
                    <label className="mt-3 text-dark" htmlFor="count">Count:</label>
                    <input type="text" 
                        name="count"
                        className="form-control"
                        value={count}
                        onChange={(event) => setCount(event.target.value)}
                    />
                    <label className="text-dark" htmlFor="duration">Duration:</label>
                    <input type="text" 
                        name="duration"
                        className="form-control"
                        value={duration}
                        onChange={(event) => setDuration(event.target.value)}
                    />
                    <button className="mt-2 btn btn-outline-dark" type='submit'>Add Activity to Routine</button>
                </form>
        }
        </div>
    )
}

export default RoutineActivityForm;