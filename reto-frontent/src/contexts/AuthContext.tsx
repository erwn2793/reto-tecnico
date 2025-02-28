import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'customer' | 'restaurant';

export interface User {
  uid: string;
  email: string;
  role: UserRole;
  name?: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  register: (email: string, password: string, role: UserRole, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const API_URL = 'http://localhost:3000/api/v1';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const register = async (email: string, password: string, role: UserRole, name: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          role,
          name
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const userData = await response.json();
      const user: User = {
        uid: userData.user.id,
        email: userData.user.email,
        role: userData.user.role,
      };
      
      setCurrentUser(user);
      // Store token in localStorage
      localStorage.setItem('authToken', userData.token);
      
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const userData = await response.json();
      const user: User = {
        uid: userData.user.id,
        email: userData.user.email,
        role: userData.user.role,
      };
      
      setCurrentUser(user);
      // Store token in localStorage
      localStorage.setItem('authToken', userData.access_token);
      localStorage.setItem('idUser', userData.user.id);
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Clear local storage and state
      localStorage.removeItem('authToken');
      setCurrentUser(null);
      
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};