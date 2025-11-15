import LandingPage from "./pages/LandingPage"
import {Route , BrowserRouter as Router, Routes} from 'react-router-dom';
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Resister";
function App() {


  return (
    <Router>
      <Routes>
        <Route path="/login" element = {<Login/>}></Route>
        <Route path ="/register" element = {<Register />}></Route>
        <Route path= "/" element= { <LandingPage/>}/>
      </Routes>
       
    </Router>
  )
}

export default App
