import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import the useAuth hook
import './AuthForm.scss';

const SignupForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook to handle redirection
    const { login } = useAuth(); // Get the login function from AuthContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const registerResponse = await fetch('http://localhost:5050/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const registerData = await registerResponse.json();
    
            if (registerResponse.ok) {
                console.log('Registration successful');
    
                // Automatically log in after registration
                const loginResponse = await fetch('http://localhost:5050/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });
                const loginData = await loginResponse.json();
    
                if (loginResponse.ok) {
                    console.log('Login successful');
    
                    // Update the user context after successful login
                    login(loginData.user); // Assuming loginData contains user info
    
                    // Redirect to the homepage
                    navigate('/');
                } else {
                    console.log('Login failed:', loginData.message);
                }
            } else {
                console.log('Registration failed:', registerData.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    required
                />
            </div>
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
            <button type="submit" className="btn auth-btn">Sign Up</button>
        </form>
    );
};

export default SignupForm;
