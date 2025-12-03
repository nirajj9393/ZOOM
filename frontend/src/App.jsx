import LandingPage from "./pages/LandingPage"
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Resister";
import Nav from "./components/Nav";
import Chat from "./components/Chat";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import OneToOneVideoCall from "./components/OneToOneVideoCall";
import JoinGuest from "./components/JoinGuest";
import { PeerProvider  } from "./provider/peer";

function App() {
  return (
    <Router>
      <Nav />  

      <PeerProvider >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat-app" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/guest" element={<JoinGuest />} />
          <Route path="/room/:roomId" element={<OneToOneVideoCall />} />
        </Routes>
      </PeerProvider >

    </Router>
  );
}

export default App;
