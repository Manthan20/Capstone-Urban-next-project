import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import { useAuth } from "../../context/AuthContext";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, username, logout, role } = useAuth();
  const navigate = useNavigate();
  console.log(isLoggedIn);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={`navbar ${menuOpen ? "open" : ""}`}>
      <div className="navbar-container">

        <input type="checkbox" checked={menuOpen} onChange={handleMenuToggle} id="menu-toggle" />
        <label htmlFor="menu-toggle" className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </label>

        <div className="menu-items-head">
          <label className="logo">
            <img src="/logo.png" alt="Logo" />
          </label>
          <div className="menu-items">
            {role === 'admin' ?
              (
                <>
                  <Link className="nav-link" to="/admin">Home</Link>
                  <Link className="nav-link" to="/admin/add-property">Add Property</Link>
                  <Link className="nav-link" to="/admin/messages">Messages</Link>
                </>
              )
              : (
                <>
                  <Link className="nav-link" to="/">Home</Link>
                  <Link className="nav-link" to="/about">About</Link>
                  <Link className="nav-link" to="/properties">Properties</Link>
                  <Link className="nav-link" to="/wishlist">Wishlist</Link>
                  <Link className="nav-link" to="/contact">Contact Us</Link>
                  {isLoggedIn && (<Link className="nav-link" to="/profile">Profile</Link>)}
                </>
              )
            }
            {isLoggedIn ? (
                <Link className="logoutBtn nav-link" onClick={handleLogout}>
                  Logout
                </Link>
            ) : (
              <>
                <Link className="nav-link" to="/login">Log In</Link>
                <Link className="nav-link signUp" to="/join">
                  Join Now !
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;