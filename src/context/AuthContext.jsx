import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('teeszone_auth_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const login = (email, password) => {
    // In a no-backend architecture, allow authenticating user with credentials or demo
    const namePart = email.split('@')[0];
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    const userData = {
      email,
      name: formattedName || 'Sales Manager',
      role: 'Sales Performance Lead',
      avatar: (formattedName || 'S')[0].toUpperCase(),
      loginTime: new Date().toISOString(),
    };
    setUser(userData);
    localStorage.setItem('teeszone_auth_user', JSON.stringify(userData));
    return { success: true };
  };

  const register = (email, name = '', role = 'Sales Representative') => {
    const displayName = name || (email.split('@')[0]);
    const userData = {
      email,
      name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
      role,
      avatar: displayName[0].toUpperCase(),
      loginTime: new Date().toISOString(),
    };
    setUser(userData);
    localStorage.setItem('teeszone_auth_user', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('teeszone_auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
