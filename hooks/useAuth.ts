import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Implement your authentication logic here
    // For now, we'll just simulate a user being logged in
    setUser({ id: '1', name: 'Test User' });
  }, []);

  return { user };
}
