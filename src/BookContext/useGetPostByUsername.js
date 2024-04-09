import React from "react";

function useGetPostByUsername(username){

  const [posts, setPosts] = React.useState();
  const [loading, setLoading] = React.useState(true); 

  React.useEffect(() => {
    fetch(`http://localhost:8080/post/username/${username}`)
      .then(response => 
        response.json()
      )
      .then(data => {
      //  console.log('API'+data)
        setPosts(data)
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener los posts:", error);
        setLoading(false);
      });
  }, [username]);

  return { posts, loading };
}
export {useGetPostByUsername}