import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({
    isAuthenticated:false,
    userLogin:"",
});

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(); // Ajusta el valor inicial según tus necesidades
    const [userLogin, setUserLogin] = useState()
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userLogin, setUserLogin }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);

export const getAuthToken = () => {
    return window.localStorage.getItem("auth_token");
}
export const setAuthToken = (token) => {    
    return window.localStorage.setItem("auth_token", token);
}

