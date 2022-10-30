import { useState, useEffect } from "react";
import { fetchUserRoutines } from "../api";
import Routine from "./Routine";
import CreateRoutineForm from "./CreateRoutineForm";

const UserRoutines = ({ activities, setActivities, token, user, setRoutines}) => {

    const [userRoutines, setUserRoutines] = useState([]);
    const [createRoutineActive, setCreateRoutineActive] = useState(false);

    
    useEffect(() => {
            const getUserRoutines = async () => {
                if (user) {
                    const routines = await fetchUserRoutines(user.username);
                    console.log(routines);
                    setUserRoutines(routines);
                }
        }
        getUserRoutines();
    } , []);

    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className="p3">My Routines</h1>
                <button className="btn btn-outline-secondary bg-white mb-3"
                onClick={() => {setCreateRoutineActive(!createRoutineActive)}}>
                {!createRoutineActive ? 'Create New Routine' : 'Hide New Routine Form'}
                </button>
            {
            createRoutineActive && <CreateRoutineForm token={token} setRoutines={setRoutines}/>
            }
            {
                userRoutines.map(routine => {
                    return <Routine key={routine.id} activities={activities} setActivities={setActivities} setRoutines={setRoutines} routine={routine} token={token} user={user}/>
                })
            }
        </div>
    )
}

export default UserRoutines;