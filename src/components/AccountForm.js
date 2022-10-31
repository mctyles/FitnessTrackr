import { useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { fetchAccount } from "../api";

const AccountForm = ({ setToken }) => {
    const navigate = useNavigate();
    const { action } = useParams();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const { token } = await fetchAccount(action, username, password);
            setToken(token);
            navigate('/');
        } catch(error) {
            setError(error);
        }

    }

    return (
        <main id="account-form" className="p-4">
            <h3>{action === 'login' ? 'Log In' : 'Sign Up'}</h3>
            {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
            <form className = "d-flex flex-column align-items-start m-3" onSubmit={handleSubmit}>
                <label className="mt-1" htmlFor="username">Username</label>
                <input className="form-control mt-2" type="text" id="username" value = {username} onChange={(event) => setUsername(event.target.value)}/>
                <label className="mt-2" htmlFor="password">Password</label>
                <input className="form-control mt-2" type="password" id="password" value = {password} onChange={(event) => setPassword(event.target.value)}/>
                <button className="btn btn-outline-light mt-3" type ="submit">{action === 'login' ? 'Log In' : 'Sign Up'}</button>
            </form>
        </main>
    )
}

export default AccountForm;