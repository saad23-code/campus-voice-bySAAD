'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const performLogin = (userData) => {
    localStorage.setItem('campus-user', JSON.stringify(userData));
    // Redirect to student page
    window.location.href = '/student'; 
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (email === 'demo@student.com' && password === 'demo123') {
      performLogin({ name: 'MOHD SAAD KHAN', email: 'demo@student.com', role: 'student' });
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className="container">
      <div className="auth-container">
        <h2 style={{ color: 'var(--primary-blue)', textAlign: 'center', marginBottom: '1.5rem' }}>Student Login</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="demo@student.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="demo123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign In</button>
        </form>
        <div className="demo-box" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button 
            onClick={() => performLogin({ name: 'MOHD SAAD KHAN', role: 'student' })}
            className="btn" 
            style={{ width: '100%', background: '#f1f5f9', color: 'var(--primary-blue)', border: '1px solid #cbd5e1' }}
          >
            👤 Quick Login as MOHD SAAD KHAN
          </button>
        </div>
      </div>
    </div>
  );
}