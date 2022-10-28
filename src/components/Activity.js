const Activity = ({activity, setActivity, token}) => {

    return (
        <div>
            <h5>{activity.name}</h5>
            <p>{activity.description}</p>
            {
                activity.duration && activity.count ?   
                <ul>
                    <li>Duration: {activity.duration}</li>
                    <li>Count: {activity.count}</li>
                </ul>
                :
                null
            }
        </div>
    )
}

export default Activity;