const Activity = ({activity}) => {

    return (
        <div>
            <h5>{activity.name}</h5>
            <p>{activity.description}</p>
            <ul>
                <li>Duration: {activity.duration}</li>
                <li>Count: {activity.count}</li>
            </ul>
        </div>
    )
}

export default Activity;