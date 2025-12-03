import styles from '../pages/LandingPage.module.css'
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
    <nav className={styles.nav_bar}>
      <div className={styles.img_div}>
        <Link to="/"> ZOOMIFY </Link>
      </div>

      <div className={styles.nav_links}>
        {!user ? (
          <div><NavLink to="/guest">JOIN AS A GUEST</NavLink></div>
        ) : (
          <div><NavLink to="/home">Home</NavLink></div>
        )}

        {user ? (
          <div>
            <button 
              className={styles.logout_btn}
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
