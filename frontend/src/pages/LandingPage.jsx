import '../pages/LandingPage.css'
import { NavLink, useNavigate } from 'react-router-dom'
function LandingPage() {
    const navigate = useNavigate();
  return (
    <>
      <div className="lp_main_content">
        <div className="left">
          <div><span>Contact</span>  with you <br />loved ones..</div>
          <div>Cover a distance by zoomify</div>
          <div 
              role="button" 
              onClick={() => navigate("/register")}
              className="get-started"
            >
              Get Started
          </div>
        </div>
        <div className="right">
          <img src="feature.png" alt="feature" />
        </div>
      </div>
    </>
  )
}

export default LandingPage