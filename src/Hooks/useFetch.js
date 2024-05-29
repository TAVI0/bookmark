import React from "react";

function useFetch(url, dato){

  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true); 

  React.useEffect(() => {
    if(dato!=null){
      setLoading(true);
      fetch(url+dato)
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

    }
  }, []);

  return { data, loading };
}
export {useFetch}