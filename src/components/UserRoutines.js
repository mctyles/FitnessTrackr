import { useState, useEffect } from "react";
import { fetchUserRoutines } from "../api";
import Routine from "./Routine";

const UserRoutines = ({token, user}) => {

    const [userRoutines, setUserRoutines] = useState([]);
    
    useEffect(() => {
            const getUserRoutines = async () => {
                if (user) {
                    console.log(user);
                    const routines = await fetchUserRoutines(user.username);
                    console.log(routines);
                    setUserRoutines(routines);
                }
        }
        getUserRoutines();
    } , []);

    return (
        <div>
            <h1>Routines</h1>
            {
                userRoutines.map(routine => {
                    return <Routine key={routine.id} routine={routine} token={token}/>
                })
            }
        </div>
    )
}

export default UserRoutines;