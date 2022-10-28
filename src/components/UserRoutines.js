import { useState, useEffect } from "react";
import { fetchRoutines } from "../api";
import Routine from "./Routine";

const UserRoutines = ({routines, setRoutines, token, user}) => {
    
    useEffect(() => {
        const getRoutines = async () => {
            const routines = await fetchRoutines();
            setRoutines(routines);
        }
        getRoutines();
    } , []);

    const userRoutines = routines.filter(routine => user.username === routine.creatorName);

    return (
        <div>
            <h1>Routines</h1>
            {
                userRoutines.map(routine => {
                    return <Routine key={routine.id} routine={routine} setRoutines={setRoutines} token={token}/>
                })
            }
        </div>
    )
}

export default UserRoutines;