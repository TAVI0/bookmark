import React from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProvider({ children }){
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);

    const login = ({ user }) => {
        setUser(user);
        navigate('/'+user.username);
    };

    const logout = () => {
        setUser(null);
        navigate('/');
    };
    
    const auth = {user, login, logout};

    return(
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(){
    const auth = React.useContext(AuthContext);
    return auth;
}

export { 
    AuthProvider,
    useAuth
};