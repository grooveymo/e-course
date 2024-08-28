import { createContext, useState, useContext, ReactNode } from 'react';
import LoginPage from '../pages/Login';

// Define types for the user and context
interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props type for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  //   const login = async (email: string, password: string): Promise<void> => {
  const login = async (name: string, password: string): Promise<void> => {
    if (name !== password) {
      throw new Error('Login failed');
    } else {
      setUser({ id: '1', name, email: 'test@test.com' });
      setIsAuthenticated(true);
    }
  };

  const logout = (): void => {
    // Implement your logout logic here
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  console.log('User:', user);
  if (!user) {
    console.log('Navigating User:', user);
    return <LoginPage login={login} />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
