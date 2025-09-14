import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.getSession();
    session.then(async ({ data: { session } }) => {
      if (session) {
        const { user } = session;
        // Fetch user profile from users table
        const { data, error } = await supabase
          .from('users')
          .select('id, name, email, is_admin')
          .eq('id', user.id)
          .single();
        if (data) {
          setUser({
            id: data.id,
            name: data.name,
            email: data.email,
            isAdmin: data.is_admin,
          });
        }
      }
      setIsLoading(false);
    });
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.session) {
      setIsLoading(false);
      throw new Error(error?.message || 'Login failed');
    }
    // Fetch user profile from users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, name, email, is_admin')
      .eq('id', data.user.id)
      .single();
    if (userData) {
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        isAdmin: userData.is_admin,
      });
      localStorage.setItem('user', JSON.stringify({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        isAdmin: userData.is_admin,
      }));
    }
    setIsLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error || !data.user) {
      setIsLoading(false);
      throw new Error(error?.message || 'Registration failed');
    }
    // Insert user profile into users table
    const { error: insertError } = await supabase
      .from('users')
      .insert([{ id: data.user.id, name, email, is_admin: false }]);
    if (insertError) {
      setIsLoading(false);
      throw new Error(insertError.message);
    }
    setUser({
      id: data.user.id,
      name,
      email,
      isAdmin: false,
    });
    localStorage.setItem('user', JSON.stringify({
      id: data.user.id,
      name,
      email,
      isAdmin: false,
    }));
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      logout, 
      register 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};