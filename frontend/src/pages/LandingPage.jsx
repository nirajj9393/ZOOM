import '../pages/LandingPage.css'
import { NavLink } from 'react-router-dom'
function LandingPage() {
  return (
    <>
      <nav className="nav_bar">
                <div><img src="logo.png" alt="app logo" /></div>
                <div className="nav_links">
                    <div><NavLink >JOIN AS A GUEST</NavLink></div>
                    <div><NavLink to="/login">LOGIN</NavLink></div>
                    <div><NavLink to="/register">REGISTER</NavLink></div>

                </div>
      </nav>
      <div className="lp_main_content">
        <div className="left">
          <div><span>Contact</span>  with you <br />loved ones..</div>
          <div>Cover a distance by zoomify</div>
          <div role="button">Get Started</div>
        </div>
        <div className="right">
          <img src="feature.png" alt="feature" />
        </div>
      </div>
    </>
  )
}

export default LandingPage