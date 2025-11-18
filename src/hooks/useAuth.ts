import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  api_key: string;
  created_at: string;
  last_login: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we have a cached user in sessionStorage for instant load
    const cachedUser = sessionStorage.getItem('user');
    if (cachedUser) {
      try {
        setUser(JSON.parse(cachedUser));
        setLoading(false);
      } catch (e) {
        // Invalid cache, continue with fetch
      }
    }

    checkAuth();

    // Listen for custom auth events (login/logout)
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener('auth-change', handleAuthChange);

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/user');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        // Cache user data for instant load on page changes
        sessionStorage.setItem('user', JSON.stringify(data.user));
      } else {
        setUser(null);
        sessionStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      sessionStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    refetch: checkAuth,
  };
}
