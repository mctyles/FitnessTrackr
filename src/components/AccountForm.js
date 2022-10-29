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
            console.error(error);
        }

    }

    return (
        <>
            <h1>{action === 'login' ? 'Log In' : 'Sign Up'}</h1>
            {error && <div class="alert alert-danger" role="alert">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value = {username} onChange={(event) => setUsername(event.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value = {password} onChange={(event) => setPassword(event.target.value)}/>
                <button type ="submit">{action === 'login' ? 'Log In' : 'Sign Up'}</button>
            </form>
        </>
    )
}

export default AccountForm;