import '../pages/LandingPage.css'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../redux/authSlice'

function Nav() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");  
  };

  return (
    <nav className="nav_bar">
      <div id = "img-div">
        <Link to="/">
          ZOOMIFY
        </Link>
      </div>

      <div className="nav_links">
         {!user ?
         (<div><NavLink>JOIN AS A GUEST</NavLink></div>):
         (  <div><NavLink to ="/home">Home</NavLink></div>)
        }
        {user ? (
          <div>
            <button 
              className="logout_btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <div><NavLink to="/login">LOGIN</NavLink></div>
            <div><NavLink to="/register">REGISTER</NavLink></div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
