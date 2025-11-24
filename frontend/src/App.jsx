import LandingPage from "./pages/LandingPage"
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Resister";
import Nav from "./components/Nav";
import Chat from "./components/Chat";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <Router>

      <Nav />  

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat-app" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
       
    </Router>
  )
}

export default App
