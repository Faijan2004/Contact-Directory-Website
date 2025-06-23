import "./App.css";
import Login from "./users/UserLogin";
import Register from "./users/UserRegister";
import About from "./About"
import Contact from "./Contact"
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav className="glass-navbar">
        <div className="logo-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5968/5968756.png"
            alt="Logo"
            className="logo-img"
          />
          <h1 className="logo-text">CMS Portal</h1>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-button">Home</Link>
          <Link to= "/About" className="nav-button">About</Link>
          <Link to= "/Contact" className="nav-button">Contact</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="users/login" element={<Login />} />
        <Route path="users/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

function Landing() {
  return (
    <div className="landing-page">
      <div className="glass-card">
        <h2>Welcome to the <span className="highlight">CMS Portal</span></h2>
        <p>Manage users smartly, beautifully, and securely.</p>
        <div className="button-group">
          <Link to="users/login" className="glass-btn login">Login</Link>
          <Link to="users/register" className="glass-btn register">Register</Link>
        </div>
      </div>
      <div>
        <img
            src="https://cdn-icons-png.flaticon.com/512/5968/5968756.png"
            alt="Logo"
            className="container-img"
          />
      </div>
    </div>
  );
}

export default App;
