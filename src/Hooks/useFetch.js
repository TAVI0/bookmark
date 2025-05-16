import React, { useEffect } from "react";
import { useAuth } from "../App/auth/AuthProvider";

function usefetch(url, dato){
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true); 

    const auth = useAuth();

    useEffect(() => {
        if (dato != null) {
            setLoading(true);
            fetch(`${url}${dato}`, {
                method: 'GET'
                
                ,headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer `+ auth.getAccessToken()
                }
                
            })
            .then(response => response.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error al obtener los datos:", error);
                setLoading(false);
            });
        }
}, [dato, url]); // Dependencias actualizadas para que se ejecute cuando `dato` o `url` cambien


  return { data, loading };
}
export {usefetch}