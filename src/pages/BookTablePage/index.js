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
    return <p>Cargando...</p>;
  }

  return (
    <>
      <table>
        <thead>
          <tr className="header">
            <th>img</th>
            <th>Book</th>
            <th>Autor</th>
            <th>start</th>
            <th>-</th>
            <th>end</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Like</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post) => (
              <BookLog key={post.id} post={post} />
            ))
          ) : (
            <tr>
              <td colSpan="10">No hay entradas para este usuario.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export { BookTablePage };
