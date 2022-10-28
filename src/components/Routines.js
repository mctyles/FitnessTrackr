import { useState, useEffect } from "react";
import { fetchRoutines } from "../api";
import Routine from "./Routine";

const Routines = ({routines, setRoutines, token}) => {
    
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
                    return <Routine key={routine.id} routine={routine} setRoutines={setRoutines} token={token}/>
                })
            }
        </div>
    )
}

export default Routines;