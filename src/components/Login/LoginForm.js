import React, { useState, useEffect } from 'react';
import './AuthForm.scss';
import { useAuth } from '../../context/AuthContext'; // Import the useAuth hook
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, user } = useAuth(); // Get the login function and user state from AuthContext
    const navigate = useNavigate(); // Use navigate hook for redirection

    useEffect(() => {
        if (user) {
            navigate('/'); // Redirect to homepage if already logged in
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5050/login", {
                email,
                password,
            });
    
            if (response.status === 200) {
                const user = response.data.user;
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    login(user);  // Call login from AuthContext
                    navigate('/');
                } else {
                    console.error("No user object in response");
                }
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
        }
    };
    
    
    

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
                <label>Email Address</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    required
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password..."
                    required
                />
            </div>
            <button type="submit" className="btn auth-btn">Log In</button>
        </form>
    );
};

export default LoginForm;
