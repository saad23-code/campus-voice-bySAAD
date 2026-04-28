'use client'; // This is required to use the Login/Logout logic

import { useState, useEffect } from 'react';
import './globals.css';

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);

  // This runs as soon as the page loads
  useEffect(() => {
    // Check if MOHD SAAD KHAN is already logged in
    const savedUser = localStorage.getItem('campus-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Function to clear the session when "Logout" is clicked
  const handleLogout = () => {
    localStorage.removeItem('campus-user');
    setUser(null);
    window.location.href = '/'; // Go back to homepage
  };

  return (
    <html lang="en">
      <head>
        <title>Campus Voice - Jamia Hamdard</title>
      </head>
      <body>
        {/* NAVIGATION BAR */}
        <nav className="navbar">
          <div className="navbar-content">
            <a href="/" className="logo">
              🎓 Campus Voice
            </a>
            
            <ul className="nav-links">
              <li><a href="/">Home</a></li>
              
              {/* AUTH LOGIC: Show name if logged in, otherwise show Login link */}
              {user ? (
                <li className="nav-user-info">
                  <span style={{ color: 'white' }}>
                    Welcome, <strong>{user.name}</strong>
                  </span>
                  <button onClick={handleLogout} className="btn-logout">
                    Logout
                  </button>
                </li>
              ) : (
                <li><a href="/login">Student Login</a></li>
              )}
              
              <li><a href="/admin">Admin Dashboard</a></li>
            </ul>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}