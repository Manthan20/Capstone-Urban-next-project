import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { isLoggedIn, username, logout, role } = useAuth();
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/login"); // Redirect to login page after logging out
  };

  return (
    <nav>
      <div className="leftSide">
        <img src="/logo.png" alt="logo" width={100} />
      </div>
      <div className="midSide">
        {role === 'admin' ?
          (
            <>
              <Link to="/admin">Home</Link>
              <Link to="/admin/add-property">Add Property</Link>
              <Link to="/profile">Profile</Link>
            </>
          )
          : (
            <>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/properties">Properties</Link>
              <Link to="/wishlist">Wishlist</Link>
              {isLoggedIn && (<Link to="/profile">Profile</Link>)}
            </>
          )
        }
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
            <Link to="/login">Log In</Link>
            <Link className="signUp" to="/join">
              Join Now !
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
