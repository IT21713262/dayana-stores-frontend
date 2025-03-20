import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
//import UserService from '../service/UserService';
import UserService from '../service/UserService';
import '../UserManagement.css';

function UserNavbar() {
    const { isAuthenticated, isAdmin, refreshAuthState } = useContext(AuthContext);

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            UserService.logout();
            refreshAuthState(); // Refresh state after logout
        }
    };

    return (
        <nav>
            <ul>
                {!isAuthenticated && <li><Link to="/">Dayana Stores</Link></li>}
                {!isAuthenticated && <li><Link to="/register">Register</Link></li>} {/* Show Register for new users */}
                {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
                {isAdmin && <li><Link to="/admin/user-management">User Management</Link></li>}
                {isAuthenticated && <li><Link to="/" onClick={handleLogout}>Logout</Link></li>}
            </ul>
        </nav>
    );
}

export default UserNavbar;
