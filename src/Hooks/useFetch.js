import React, { useEffect } from "react";
import { getAuthToken } from "../App/auth/AuthProvider";

function useFetch(url, dato){

  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true); 


  useEffect(() => {
    if (dato != null) {
        setLoading(true);
        fetch(`${url}${dato}`, {
            method: 'GET'
            
            ,headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer `+getAuthToken()
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
export {useFetch}