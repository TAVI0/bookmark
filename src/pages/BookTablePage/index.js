import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BookLog } from "../BookLog";
import { postService } from "../../services/postService.ts";
import "./index.css";

function BookTablePage() {
  const { username } = useParams();
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await postService.getByUsername(username);
        setPosts(data);
      } catch (err) {
        console.error("Error al obtener posts:", err);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchPosts();
    } else {
      setPosts([]);
      setLoading(false);
    }
  }, [username]);

  if (loading) {
    return <p className="loading">Cargando...</p>;
  }

  return (
    <div className="table-container">
      <table className="book-table">
        <thead>
          <tr>
            <th>Portada</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Inicio</th>
            <th>-</th>
            <th>Fin</th>
            <th>Rating</th>
            <th>Reseña</th>
            <th>Like</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post) => (
              <BookLog key={post.id} post={post} />
            ))
          ) : (
            <tr>
              <td colSpan="10" className="no-data">
                No hay entradas para este usuario.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export { BookTablePage };
