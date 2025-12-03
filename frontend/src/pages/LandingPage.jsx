import styles from '../pages/LandingPage.module.css';
import { NavLink, useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.lp_main_content}>
        
        <div className={styles.left}>
          <div>
            <span>Contact</span> with you <br /> loved ones..
          </div>

          <div>Cover a distance by zoomify</div>

          <div
            role="button"
            onClick={() => navigate("/register")}
            className={styles.get_started}
          >
            Get Started
          </div>
        </div>

        <div className={styles.right}>
          <img src="feature.png" alt="feature" />
        </div>
      </div>
    </>
  );
}

export default LandingPage;
