import React from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { useAuth } from './../../context/AuthContext';

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  

  const navbarItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Appointments', path: '/appointments' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <div className='main-nav'>
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
                       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              {/* Navbar Links */}
              <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                {navbarItems.map((navSingle, index) => (
                  <li className="nav-item" key={index}>
                    <Link className="nav-link" to={navSingle.path}>{navSingle.name}</Link>
                  </li>
                ))}
                {user && user.email === 'tolic575@gmail.com' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">AdminPanel</Link>
                  </li>
                )}
              </ul>
              <div>
              </div>
              {/* Dynamic Button Section */}
              <div className="theme-btn">
                {!isLoggedIn ? (
                  <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                  </>
                ) : (
                  <div>
                    <button onClick={logout}>Logout</button>
                    {user?.isAdmin && <Link to="/admin">Admin Panel</Link>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
