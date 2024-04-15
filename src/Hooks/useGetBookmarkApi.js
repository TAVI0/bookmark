import React from "react";

function useGetBookmarkApi(endpoint, value){

  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(true); 

  React.useEffect(() => {
    fetch(`http://localhost:8080${endpoint}${value}`)
    .then(response => 
      response.json()
    )
    .then(dataJson => {
        console.log("endpoint: "+endpoint+" value: "+value);
        setData(dataJson)
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener los datos:", error);
        setLoading(false);
      });
  }, [data]);

  return { data, loading };
}
export {useGetBookmarkApi}