import React from "react";

function useFetch(url){

  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true); 

  React.useEffect(() => {
    setLoading(true);
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            setData(data);
            setLoading(false);
        })
        //.finally(()=> setLoading(false))
        .catch(error => {
            console.error("Error al obtener los datos:", error);
            setLoading(false);
        });
  }, []);

  return { data, loading };
}
export {useFetch}