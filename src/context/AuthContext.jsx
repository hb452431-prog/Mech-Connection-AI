import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const loginWithGoogle = async (role = 'driver') => {
    setLoading(true);
    try {
      const user = await authService.loginWithGoogle(role);
      setCurrentUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async (email, password, role = 'driver') => {
    setLoading(true);
    try {
      const user = await authService.loginWithEmail(email, password, role);
      setCurrentUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    try {
      const user = await authService.register(data);
      setCurrentUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const switchRole = (newRole) => {
    const user = authService.switchRole(newRole);
    setCurrentUser(user);
    return user;
  };

  const logout = async () => {
    await authService.logout();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    loginWithGoogle,
    loginWithEmail,
    register,
    switchRole,
    logout,
    isDriver: currentUser?.role === 'driver',
    isMechanic: currentUser?.role === 'mechanic'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
