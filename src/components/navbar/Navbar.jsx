import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { isLoggedIn, username, logout } = useAuth();
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/login"); // Redirect to login page after logging out
  };

  return (
    <nav>
      <div className="leftSide">
        <Link to="/">Urban Nest</Link>
      </div>
      <div className="midSide">
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Agents</Link>
      </div>
      <div className="rightSide">
        {isLoggedIn ? (
          <div className="userInfo">
            <button className="logoutBtn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login">Sign In</Link>
            <Link className="signUp" to="/signup">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
