
function LandingPage() {
  return (
    <>
      <nav className="nav_bar">
                <div><img src="logo.png" alt="app logo" /></div>
                <div className="nav_links">
                    <div><a href="">JOIN AS A GUEST</a></div>
                    <div><a href="">LOGIN</a></div>
                    <div><a href="">REGISTER</a></div>
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