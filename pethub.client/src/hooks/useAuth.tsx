/*
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { apiService } from '@/services/apiService';

interface DbUser {
  UserId: number;
  Email: string;
  FirstName: string;
  LastName: string;
  UserType: string;
  ProfilePicture?: string;
}

interface User {
  id: string;
  userid: number;
  email: string;
  name: string;
  userType: 'individual' | 'shop' | 'admin';
  profilePicture?: string;
  dbUser?: DbUser;
}

interface AuthContextType {
  user: User | null;
  isSignedIn: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  testSignIn: (userId: number) => Promise<void>;
  createMissingTestUsers: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Check for existing auth token on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
  }, []);

  const createMissingTestUsers = async () => {
    try {
      console.log('Requesting test users from backend...');
      await apiService.getTestUsers();
    } catch (error) {
      console.error('Error fetching test users:', error);
    }
  };

  const testSignIn = async (userId: number) => {
    try {
      setLoading(true);
      console.log('Test signing in user:', userId);
      
      const response = await apiService.testSignIn(userId);
      
      if (response.success && response.user) {
        const dbUser = response.user;
        const userType = dbUser.userType?.toLowerCase() as 'individual' | 'shop' | 'admin' || 'individual';
        
        const userData = {
          id: `test-${userId}`,
          userid: dbUser.userId,
          email: dbUser.email,
          name: `${dbUser.firstName} ${dbUser.lastName}`,
          userType,
          profilePicture: dbUser.profilePicture || undefined,
          dbUser: {
            UserId: dbUser.userId,
            Email: dbUser.email,
            FirstName: dbUser.firstName,
            LastName: dbUser.lastName,
            UserType: dbUser.userType,
            ProfilePicture: dbUser.profilePicture
          }
        };
        
        setUser(userData);
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userData', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Error in testSignIn:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('Attempting to sign in with email:', email);
      
      const response = await apiService.signIn(email, password);
      
      if (response.success && response.user) {
        const dbUser = response.user;
        const userType = dbUser.userType?.toLowerCase() as 'individual' | 'shop' | 'admin' || 'individual';
        
        const userData = {
          id: dbUser.userId.toString(),
          userid: dbUser.userId,
          email: dbUser.email,
          name: `${dbUser.firstName} ${dbUser.lastName}`,
          userType,
          profilePicture: dbUser.profilePicture || undefined,
          dbUser: {
            UserId: dbUser.userId,
            Email: dbUser.email,
            FirstName: dbUser.firstName,
            LastName: dbUser.lastName,
            UserType: dbUser.userType,
            ProfilePicture: dbUser.profilePicture
          }
        };
        
        setUser(userData);
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userData', JSON.stringify(userData));
      } else {
        throw new Error(response.message || 'Sign in failed');
      }
    } catch (error) {
      console.error('Error in signIn:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setLoading(true);
      const response = await apiService.signUp(email, password, firstName, lastName);
      
      if (response.success) {
        // Auto sign in after successful sign up
        await signIn(email, password);
      } else {
        throw new Error(response.message || 'Sign up failed');
      }
    } catch (error) {
      console.error('Error in signUp:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  };

  const isSignedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, isSignedIn, signIn, signUp, signOut, loading, testSignIn, createMissingTestUsers }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
*/

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import users from '../data/userdata.json';

interface User {
    username: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isSignedIn: boolean;
    signIn: (username: string, password: string) => Promise<void>;
    signOut: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const signIn = async (username: string, password: string) => {
        setLoading(true);
        try {
            const foundUser = users.find(
                (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
            );

            if (!foundUser) {
                throw new Error('Invalid username or password');
            }

            const userData: User = {
                username: foundUser.username,
                name: foundUser.name,
                email: foundUser.email
            };

            setUser(userData);
            localStorage.setItem('userData', JSON.stringify(userData));
        } finally {
            setLoading(false);
        }
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem('userData');
    };

    const isSignedIn = !!user;

    return (
        <AuthContext.Provider value={{ user, isSignedIn, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}
