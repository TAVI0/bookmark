import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({
    isAuthenticated:false,
});

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Ajusta el valor inicial según tus necesidades

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}
const useAuth = () => useContext(AuthContext);

export{ AuthProvider, useAuth}