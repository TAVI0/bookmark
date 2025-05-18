
import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../../services/authService.js'; 

export const AuthContext = createContext({
  user: null,
  loading: false,
  login: async () => {},
  logout: () => {}
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al montar, chequeamos si hay JWT en localStorage
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setLoading(false);
      return;
    }

    authService.getUserByJWT(token)
      .then(userData => {
        setUser(userData);
      })
      .catch(err => {
        console.error('Error validando token:', err);
        localStorage.removeItem('jwtToken');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Función de login expuesta en el contexto
  const login = async ({ username, password }) => {
    setLoading(true);
    try {
      const response = await authService.login({ username, password });
      // asumo que viene { token, ... }
      const token = response.token;
      localStorage.setItem('jwtToken', token);

      const userData = await authService.getUserByJWT(token);
      setUser(userData);

      return userData;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función de logout
  const logout = () => {
    localStorage.removeItem('jwtToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}