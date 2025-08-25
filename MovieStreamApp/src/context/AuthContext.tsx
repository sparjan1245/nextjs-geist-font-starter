import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (name: string, email: string) => void;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      
      // Basic validation
      if (!email || !password) {
        setError('Email and password are required');
        return false;
      }
      
      if (!email.includes('@')) {
        setError('Please enter a valid email address');
        return false;
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: email,
      };
      
      setUser(mockUser);
      return true;
    } catch (err) {
      setError('Login failed. Please try again.');
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      
      // Basic validation
      if (!name || !email || !password) {
        setError('All fields are required');
        return false;
      }
      
      if (!email.includes('@')) {
        setError('Please enter a valid email address');
        return false;
      }
      
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful signup
      const mockUser: User = {
        id: '1',
        name: name,
        email: email,
      };
      
      setUser(mockUser);
      return true;
    } catch (err) {
      setError('Signup failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    try {
      setUser(null);
      setError(null);
    } catch (err) {
      setError('Logout failed. Please try again.');
    }
  };

  const updateProfile = (name: string, email: string) => {
    try {
      if (!user) return;
      
      if (!name || !email) {
        setError('Name and email are required');
        return;
      }
      
      if (!email.includes('@')) {
        setError('Please enter a valid email address');
        return;
      }
      
      setUser({
        ...user,
        name,
        email,
      });
      
      setError(null);
    } catch (err) {
      setError('Profile update failed. Please try again.');
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateProfile,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
