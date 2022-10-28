import { Link } from 'react-router-dom'

const Routine = ({routine, setRoutines, token}) => {
    return (
        <div className="card my-3">
            <h5 className="card-header">{routine.name}</h5>
            <div className="card-body">
                <p className="card-title">Created by: {routine.creatorName}</p>
                <p className="card-title">Goal: {routine.goal}</p>
            </div>
        </div>
    )
}

export default Routine;