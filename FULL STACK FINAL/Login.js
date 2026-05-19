import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    if (username === 'admin' && password === 'admin') {
      onLogin('admin', username);
    } else {
      // Mock user login
      onLogin('user', username);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <LogIn size={32} style={{ color: '#10b981', marginBottom: '1rem' }} />
          <h2>Welcome to EventMaster</h2>
          <p>Please login to continue</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username (use 'admin' for Admin)"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password (use 'admin' for Admin)"
              className="form-input"
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Login
          </button>
        </form>
        
        <div className="login-hint">
          <p><strong>Admin Access:</strong> username: <code>admin</code> | password: <code>admin</code></p>
          <p><strong>User Access:</strong> any other username/password</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
