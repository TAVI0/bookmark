// src/context/AuthProvider.js

import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../../services/authService.ts";

const AuthContext = createContext({
  isAuthenticated: false,
  userLogin: "",
  getAccessToken: () => null,
  saveUser: () => {},
  setIsAuthenticated: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken]       = useState(() => window.localStorage.getItem("auth_token"));
  const [userLogin, setUserLogin]           = useState(null);

  // Al montar, comprobamos si hay token y traemos el usuario
  useEffect(() => {
    const token = window.localStorage.getItem("auth_token");
    if (token) {
      // guardamos en estado para que getAccessToken lo devuelva
      setAccessToken(token);
      // pedimos al backend el usuario
      authService.getUserByJWT(token)
        .then(username => {
          setUserLogin(username);
          setIsAuthenticated(true);
        })
        .catch(err => {
          console.error("checkAuth error:", err);
          clearAuth();
        });
    }
  }, []);

  // Guarda token y username tras hacer login
  function saveUser({ token, username }) {
    window.localStorage.setItem("auth_token", token);
    setAccessToken(token);
    setUserLogin(username);
    setIsAuthenticated(true);
  }

  // Recupera el token en cualquier parte
  function getAccessToken() {
    return accessToken;
  }

  // Borra todo al hacer logout o cuando el token es inválido
  function clearAuth() {
    window.localStorage.removeItem("auth_token");
    setAccessToken(null);
    setUserLogin(null);
    setIsAuthenticated(false);
  }

  // Función pública para desloguear
  function logout() {
    clearAuth();
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userLogin,
        getAccessToken,
        saveUser,
        setIsAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
