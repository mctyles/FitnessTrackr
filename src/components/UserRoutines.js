import { useState, useEffect } from "react";
import { fetchUserRoutines } from "../api";
import Routine from "./Routine";
import CreateRoutineForm from "./CreateRoutineForm";

const UserRoutines = ({token, user, setRoutines}) => {

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
        <div>
            <h1>My Routines</h1>
                <button className="btn btn-outline-primary mb-3"
                onClick={() => {setCreateRoutineActive(!createRoutineActive)}}>
                {!createRoutineActive ? 'Create New Routine' : 'Hide New Routine Form'}
                </button>
            {
            createRoutineActive && <CreateRoutineForm token={token} setRoutines={setRoutines}/>
            }
            {
                userRoutines.map(routine => {
                    return <Routine key={routine.id} routine={routine} token={token} user={user}/>
                })
            }
        </div>
    )
}

export default UserRoutines;