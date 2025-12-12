import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const ADMIN_CREDENTIALS = {
  username: 'elga_admin',
  password: 'admin123' // Change this after first login!
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('elga_nikita_admin');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('elga_nikita_admin');
      }
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const userData = {
        username,
        name: 'Admin Elga & Nikita',
        role: 'admin',
        loginTime: new Date().toISOString()
      };
      
      setUser(userData);
      localStorage.setItem('elga_nikita_admin', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    
    return { success: false, error: 'Username atau password salah' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('elga_nikita_admin');
  };

  const updateCredentials = (newUsername, newPassword) => {
    // In a real app, this would be an API call
    ADMIN_CREDENTIALS.username = newUsername;
    ADMIN_CREDENTIALS.password = newPassword;
    
    const userData = {
      username: newUsername,
      name: 'Admin Elga & Nikita',
      role: 'admin',
      loginTime: new Date().toISOString()
    };
    
    setUser(userData);
    localStorage.setItem('elga_nikita_admin', JSON.stringify(userData));
    
    return { success: true };
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateCredentials,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
