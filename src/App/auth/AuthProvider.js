import React, { createContext, useContext, useEffect, useState } from "react";
//import { API_URL } from "../../dataApp";

const AuthContext = createContext({
    isAuthenticated:false,
    userLogin:"",
    getAccessToken: ()=>{},
    saveUser:()=>{},
    setIsAuthenticated: ()=>{},
});

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Ajusta el valor inicial según tus necesidades
    const [accessToken, setAccessToken] = useState()
    const [userLogin, setUserLogin] = useState()
    const API_URL = process.env.REACT_APP_API_URL ?? '';
  
    useEffect(()=> {
        checkAuth()
    },[]);

    async function checkAuth(){
        if(accessToken){
            setIsAuthenticated(true);
        }else{
            const token = getAuthToken();
            if(token!=='null'){
                try{
                    fetch(`${API_URL}auth/getUserByJWT/${token}`, {
                        method: 'GET'
                        ,headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    .then(response => response.text())
                    .then((data) => {
                        setUserLogin(data);
                    })
                }catch{
                    console.log("error");
                }
                setIsAuthenticated(true);
            }else{
                setIsAuthenticated(false);
            }
        }
    }

    useEffect(() => {
        console.log("isAuthenticated changed: " + isAuthenticated);
    }, [isAuthenticated]);

    useEffect(() => {
        console.log("userLogin changed: " + userLogin);
    }, [userLogin]);

    function getAccessToken(){
        return accessToken;
    }

    function getAuthToken(){
        return window.localStorage.getItem("auth_token");
    }

    function saveUser(userData){
        setAccessToken(userData.token);
        setIsAuthenticated(true);
        setUserLogin(userData.username);
        return window.localStorage.setItem("auth_token", userData.token);

    }
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, getAccessToken, saveUser, userLogin, setUserLogin }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);

export const setAuthToken = (token) => {    
    return window.localStorage.setItem("auth_token", token);
}

