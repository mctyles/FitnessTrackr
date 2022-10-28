import { useState, useEffect } from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { fetchUser } from './api';

import AccountForm from './components/AccountForm';
import Home from './components/Home';
import Header from './components/Header';

const App = () => {
    
    const [token, setToken] = useState(window.localStorage.getItem('token') || '');
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                const user = await fetchUser(token);
                setUser(user);
            }
            getUser();
        }
    }, [token])

    useEffect (() => {
        window.localStorage.setItem('token', token)
    }, [token])

    return (
        <BrowserRouter>
            <div>
                <Header />
                    <Routes>
                        <Route path="/" element={<Home user={user} token={token}/>}></Route>
                        <Route path="/account/:action" element ={<AccountForm setToken = {setToken}/>}></Route>
                    </Routes>
            </div>
        </BrowserRouter> 
    )
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);