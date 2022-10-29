import { useState, useEffect } from "react";
import { fetchRoutines } from "../api";
import Routine from "./Routine";
import CreateRoutineForm from "./CreateRoutineForm";

const Routines = ({routines, setRoutines, token, user}) => {
    
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
                routines.map(routine => {
                    return <Routine key={routine.id} routine={routine} setRoutines={setRoutines} token={token} user={user}/>
                })
            }
        </div>
    )
}

export default Routines;