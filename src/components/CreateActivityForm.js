import { addActivity } from "../api";
import { useState } from 'react';

const CreateActivityForm = ({ setActivities, token }) => {
    const [activityName, setActivityName] = useState('');
    const [activityDescription, setActivityDescription] = useState('');

    const handleSubmit = async (event) => {
        try {
            event.preventDefault()
            const newActivity = await addActivity(token, activityName, activityDescription);
            setActivities((prev) => [newActivity, ...prev]);
            setActivityName("");
            setActivityDescription("");
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
                    <label htmlFor="name">Name:</label>
                    <input type="text" 
                        name="name"
                        className="form-control"
                        value={activityName}
                        onChange={(event) => setActivityName(event.target.value)}
                    />
                    <label className="mt-2" htmlFor="description">Description:</label>
                    <textarea type="text" 
                        name="description"
                        className="form-control"
                        value={activityDescription}
                        onChange={(event) => setActivityDescription(event.target.value)}
                    />
                    <button className="mt-2 btn btn-outline-dark" type='submit'>Post</button>
                </form>
        }
        </div>
    )
}

export default CreateActivityForm;