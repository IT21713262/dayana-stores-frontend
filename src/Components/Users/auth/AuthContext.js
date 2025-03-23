import React, { createContext, useState, useEffect } from 'react';
import UserService from '../service/UserService';

export const AuthContext = createContext();


// children: This is the content (e.g., Navbar, routes) wrapped inside the AuthProvider.
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('role') === 'ADMIN');
    const [isUser, setIsUser] = useState(localStorage.getItem('role') === 'USER');
    
    // Refresh authentication state
    const refreshAuthState = () => {
        setIsAuthenticated(UserService.isAuthenticated());
        setIsAdmin(UserService.isAdmin());
        setIsUser(UserService.isUser());
    };

    useEffect(() => {
        refreshAuthState(); // Initial authentication check
    }, []);

    return (
        // AuthContext.Provider: Makes the context values available to all child components.
        // (isAuthenticated, isAdmin, refreshAuthState)
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, isUser, refreshAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};
