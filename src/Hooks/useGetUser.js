import React from "react";

function useGetUsers(username){

  const [user, setUser] = React.useState();
  const [loading, setLoading] = React.useState(true); 

  React.useEffect(() => {
    fetch(`http://localhost:8080/user/username/${username}`)
      .then(response => 
        response.json()
      )
      .then(data => {
        console.log('API'+data)
        setUser(data)
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener los Usuarios:", error);
        setLoading(false);
      });
  }, [username]);

  return { user, loading };
}
export {useGetUsers}