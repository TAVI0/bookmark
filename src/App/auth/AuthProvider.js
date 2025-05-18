import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../../services/authService.ts";
import { userService } from "../../services/userService.ts";

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
  const [accessToken,   setAccessToken]   = useState(() =>
    window.localStorage.getItem("auth_token")
  );
  const [user,           setUser]         = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("auth_token");
    if (!token) return;

    setAccessToken(token);
    // 1️⃣ Primero obtengo el username desde el JWT
    authService
      .getUserByJWT(token)            // devuelve un string: "miUsuario"
      .then((username) => {
        // 2️⃣ Luego pido el objeto completo al userService
        return userService.getByUsername(username);
      })
      .then((fullUserObj) => {
        // fullUserObj debería tener { id, username, description, … }
        setUser(fullUserObj);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.error("Auth check error:", err);
        clearAuth();
      });
  }, []);

  function saveUser({ token, id, username }) {
    window.localStorage.setItem("auth_token", token);
    setAccessToken(token);
    setUser({ id, username });
    setIsAuthenticated(true);
  }

  function clearAuth() {
    window.localStorage.removeItem("auth_token");
    setAccessToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }

  function logout() {
    clearAuth();
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        saveUser,
        logout,
        // …
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);