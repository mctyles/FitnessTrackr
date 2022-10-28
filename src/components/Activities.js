import { useEffect } from "react";
import { fetchActivities } from "../api";
import Activity from "./Activity";

const Activities = ({activities, setActivities, user, token}) => {
    useEffect(() => {
        const getActivities = async () => {
            const activities = await fetchActivities();
            setActivities(activities);
        }
        getActivities();
    } , []);

    return (
        <div>
            <h1>Activities</h1>
            {
                activities.map(activity => {
                    return <Activity key={activity.id} activity={activity} setActivities={setActivities} token={token}/>
                })
            }
        </div>
    )
}

export default Activities;