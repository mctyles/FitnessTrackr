import { useState, useEffect } from "react";
import { fetchRoutines } from "../api";
import Routine from "./Routine";
import CreateRoutineForm from "./CreateRoutineForm";

const Routines = ({activities, setActivities, routines, setRoutines, token, user}) => {
    
    useEffect(() => {
        const getRoutines = async () => {
            const routines = await fetchRoutines();
            setRoutines(routines);
        }
        getRoutines();
    } , []);

    return (
        <div className="d-flex flex-column align-content-center">
            <h1 className="m-3">Routines</h1>
            {
                routines.map(routine => {
                    return <Routine key={routine.id} activities={activities} setActivities={setActivities} routine={routine} setRoutines={setRoutines} token={token} user={user}/>
                })
            }
        </div>
    )
}

export default Routines;