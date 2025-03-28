import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';
import { AuthContext } from '../auth/AuthContext';
import '../UserManagement.css';
import Footer from '../common/Footer';
import UserNavbar from '../common/UserNavbar';


function LoginPage() {
    const { refreshAuthState } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await UserService.login(email, password);
            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role.toUpperCase()); // Normalize role
                refreshAuthState(); // Refresh state after login

                // Redirect based on role
                if (userData.role.toUpperCase() === 'ADMIN') {
                    navigate('/EmployeeDashboard');
                } else if (userData.role.toUpperCase() === 'USER') {
                    navigate('/OrderManagementDashboard');
                } else {
                    // Fallback in case role is something unexpected
                    navigate('/login');
                }
            } else {
                setError(userData.message);
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <>
            <UserNavbar />
            <div className="login-form auth-container">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default LoginPage;
