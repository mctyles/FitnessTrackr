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
                {
                    token &&
                    <li>
                        <Link to="/user/routines">My Routines</Link>
                    </li>
                }
                <li>
                    <Link to="/activities">Activities</Link>
                </li>
                <li>
                    <div>
                        {
                        token ?
                        <>
                            <Link to="/profile/home">Profile</Link>
                            <a href="#" onClick = { () => {
                                logout();
                                return false;
                            }
                            }> Log Out</a>
                        </> :
                        <>
                            <Link to="/account/login"> Login</Link>
                            <Link to="/account/signup"> Sign Up</Link>
                        </>
                        }
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;