import { useState } from 'react';

const CreateRoutineForm = ({setRoutines}) => {
    const [routineName, setRoutineName] = useState('');
    const [routineGoal, setRoutineGoal] = useState('');

    const handleSubmit = async (event) => {
        try {
            event.preventDefault()
            const { newRoutine } = await addRoutine(token, name, goal);
            setRoutines((prev) => [newRoutine, ...prev]);
            setRoutineName("");
            setRoutineGoal("");
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
                        value={routineName}
                        onChange={(event) => setRoutineName(event.target.value)}
                    />
                    <label className="mt-2" htmlFor="goal">Goal:</label>
                    <textarea type="text" 
                        name="goal"
                        className="form-control"
                        value={routineGoal}
                        onChange={(event) => setRoutineGoal(event.target.value)}
                    />
                    <button className="mt-2 btn btn-outline-dark" type='submit'>Post</button>
                </form>
        }
        </div>
    )}

export default CreateRoutineForm;