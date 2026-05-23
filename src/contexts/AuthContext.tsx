
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for authentication simulation
const DEMO_USERS: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  { id: '2', name: 'Test User', email: 'user@example.com', role: 'customer' },
];

// Demo passwords (in a real app, these would be hashed and stored securely)
const DEMO_PASSWORDS: Record<string, string> = {
  'admin@example.com': 'admin123',
  'user@example.com': 'user123',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse user from localStorage:', e);
      }
    }
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const demoUser = DEMO_USERS.find(user => user.email === email);
    
    if (demoUser && DEMO_PASSWORDS[email] === password) {
      setUser(demoUser);
      localStorage.setItem('user', JSON.stringify(demoUser));
      toast.success(`Welcome back, ${demoUser.name}!`);
      return true;
    } else {
      toast.error('Invalid email or password');
      return false;
    }
  };
  
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if email is already in use
    if (DEMO_USERS.some(user => user.email === email)) {
      toast.error('Email already in use');
      return false;
    }
    
    // In a real app, we would create a new user in the database
    // Here we'll just simulate a successful registration
    toast.success('Registration successful! Please log in.');
    return true;
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('You have been logged out');
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      isAuthenticated: user !== null,
      isAdmin: user?.role === 'admin'
    }}>
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
