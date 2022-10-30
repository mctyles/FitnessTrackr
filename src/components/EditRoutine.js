import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateRoutine } from "../api";

const EditRoutine = ({routine, setEditRoutineActive, token}) => {
    const [routineName, setRoutineName] = useState(`${routine.name}`);
    const [routineGoal, setRoutineGoal] = useState(`${routine.goal}`);
    const [isPublic, setIsPublic] = useState(routine.isPublic);

    const navigate = useNavigate();
    const routineId = routine.id;

    const handleSubmit = async (event) => {
        try {
            event.preventDefault()
            const editedRoutine = await updateRoutine(token, routineName, routineGoal, isPublic, routineId);
            navigate(`/routines/${routineId}`)
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div className='p5'>
        {
            token &&
                <form 
                className="card m-3 p-3"
                onSubmit={handleSubmit}
                >
                    <input type="text" 
                        name="name"
                        className="form-control card-title text-dark"
                        value={routineName}
                        onChange={(event) => setRoutineName(event.target.value)}
                    />
                    <label className="mt-2" htmlFor="goal">Goal:</label>
                    <textarea type="text" 
                        name="goal"
                        className="form-control card-text text-dark"
                        value={routineGoal}
                        onChange={(event) => setRoutineGoal(event.target.value)}
                    />
                    <div className="d-flex flex-column align-items-start">
                        <label className="mt-2" htmlFor="public-option">Public Routine</label>
                        <input type="checkbox" 
                            name="public-option"
                            id="public-checkbox"
                            onChange={(event) => {
                                if (event.target.checked) {
                                    setIsPublic(true);
                                } else {
                                    setIsPublic(false);
                                }
                            }}
                        />
                    </div>
                    <button className="btn btn-outline-light mt-3" type='submit'>Submit Changes</button>
                    <button className="btn btn-outline-danger ml-2" onClick={() => setEditRoutineActive(false)}>Cancel</button>
                </form>
        }
        </div>
    )
}

export default EditRoutine;