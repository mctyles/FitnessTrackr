import { Link, useNavigate } from 'react-router-dom';

const Nav = ({ token, setToken, user, setUser }) => {
    const navigate = useNavigate();

    const logout = () => {
        setToken('');
        setUser(null);
        navigate('/');
    }

    return (
        <nav id="nav" className='nav d-flex p-1 flex-row justify-content-between bg-light'>
                <ul className="nav nav-pills d-flex p-2 flex-row">
                    <li className="nav-item">
                        <div className='nav-link d-flex align-items-center'>
                            <span className="material-symbols-outlined text-dark">house</span>
                            <Link to="/">Home</Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className='nav-link d-flex align-items-center'>
                            <span className="material-symbols-outlined text-dark">run_circle</span>
                            <Link to="/routines">Routines</Link>
                        </div>
                    </li>
                    {
                        token &&
                        <li className="nav-item">
                            <div className='nav-link d-flex align-items-center'>
                                <span className="material-symbols-outlined text-dark">settings_accessibility</span>
                                <Link to="/user/routines"> My Routines</Link>
                            </div>
                        </li>
                    }
                    <li className="nav-item">
                        <div className='nav-link d-flex align-items-center'>
                            <span className="material-symbols-outlined text-dark">sports_gymnastics</span>
                            <Link to="/activities"> Activities</Link>
                        </div>
                    </li>
                </ul>    
                <ul className="nav nav-pills d-flex p-2 flex-row">
            <li className="nav-item dropdown">
                {
                token ?
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">{user ? user.username : 'Account'}</a> :
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Log In / Sign Up</a>
                }
                <div className="dropdown-menu">
                    {
                    token ?
                    <>
                        <a className ="dropdown-item" href="#" onClick = { () => {
                            logout();
                            return false;
                        }
                        }> Log Out</a>
                    </> :
                    <>
                        <Link className ="dropdown-item" to="/account/login"> Login</Link>
                        <Link className ="dropdown-item" to="/account/signup"> Sign Up</Link>
                    </>
                    }
                </div>
            </li>
        </ul>
        </nav>
    )
}

export default Nav;