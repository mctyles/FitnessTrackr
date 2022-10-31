import { useState, useEffect } from "react";
import { fetchUserRoutines } from "../api";
import Routine from "./Routine";
import CreateRoutineForm from "./CreateRoutineForm";

const UserRoutines = ({ activities, setActivities, token, user, setRoutines, userRoutines, setUserRoutines, setSuccessMsg}) => {
    
    const [createRoutineActive, setCreateRoutineActive] = useState(false);

    
    useEffect(() => {
            const getUserRoutines = async () => {
                if (user) {
                    const routines = await fetchUserRoutines(user.username);
                    setUserRoutines(routines);
                }
        }
        getUserRoutines();
    } , []);

    return (
        <div className="d-flex flex-column align-content-center">
            <h1 className="mt-3 ml-3 p3">My Routines</h1>
                <button className="mt-3 ml-3 align-self-start btn btn-outline-light mt-3"
                onClick={() => {setCreateRoutineActive(!createRoutineActive)}}>
                {!createRoutineActive ? 'Create New Routine' : 'Hide New Routine Form'}
                </button>
            {
            createRoutineActive && <CreateRoutineForm token={token} setUserRoutines={setUserRoutines}/>
            }
            {
                userRoutines.map(routine => {
                    return <Routine key={routine.id} activities={activities} setActivities={setActivities} setRoutines={setRoutines} routine={routine} token={token} user={user} userRoutines={userRoutines} setUserRoutines={setUserRoutines} setSuccessMsg={setSuccessMsg}/>
                })
            }
        </div>
    )
}

export default UserRoutines;