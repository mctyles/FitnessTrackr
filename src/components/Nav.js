import { Link, useNavigate } from 'react-router-dom';

const Nav = ({ token, setToken }) => {
    const navigate = useNavigate();

    const logout = () => {
        setToken('');
        navigate('/');
    }

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/routines">Routines</Link>
                </li>
                <li>
                    <Link to="/">My Routines</Link>
                </li>
                <li>
                    <div className="dropdown-menu">
                        {
                        token ?
                        <>
                            <Link className ="dropdown-item" to="/profile/home">Profile</Link>
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