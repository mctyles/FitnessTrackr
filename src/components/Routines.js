import { useState, useEffect } from "react";
import { fetchRoutines } from "../api";
import Routine from "./Routine";
import CreateRoutineForm from "./CreateRoutineForm";

const Routines = ({routines, setRoutines, token}) => {

    const [createRoutineActive, setCreateRoutineActive] = useState(false);
    
    useEffect(() => {
        const getRoutines = async () => {
            const routines = await fetchRoutines();
            setRoutines(routines);
        }
        getRoutines();
    } , []);

    return (
        <div>
            <h1>Routines</h1>
            {
            token &&
            <button className="btn btn-outline-primary mb-3"
                onClick={() => {setCreateRoutineActive(!createRoutineActive)}}>
                {!createRoutineActive ? 'Create New Routine' : 'Hide New Routine Form'}
                </button>
            }
            {createRoutineActive &&
            <CreateRoutineForm token={token} setRoutines={setRoutines}/>
            }
            {
                routines.map(routine => {
                    return <Routine key={routine.id} routine={routine} setRoutines={setRoutines} token={token}/>
                })
            }
        </div>
    )
}

export default Routines;