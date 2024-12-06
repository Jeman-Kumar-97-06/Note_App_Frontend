import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () =>{
    const {logout} = useLogout();
    const {user}   = useAuthContext();
    const handleLogout = () => {
            logout();
    }
    return (
        <div className='navbar_comp'>
            <div className="nav1_2">
                <Link to='/'>Take - Notes</Link>
            </div>
            <div className="nav2_2">
                {!user && (<div className='nav2_2cont'>
                            <Link to='/login'>Login</Link>
                            <Link to='/signup'>Signup</Link>
                          </div>
                            )
                }
                
                {user && (<div className='dropdown'>
                            <span className="usr_email" id="full_email">{user.email}</span>
                            <span id='profile_pic' className="dropbtn usr_email">{user.email}</span>
                            <div className='nav2_2cont dropdown-content'>
                                <p onClick={handleLogout} style={{width:"50px",borderRadius:"3px"}}>Logout</p>
                            </div>
                          </div>)}
            </div>
        </div>
    )
}

export default Navbar;