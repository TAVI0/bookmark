import { useParams, NavLink } from "react-router-dom";
import "./ProfilePage.css";
import { userService } from "../../services/userService.ts";
import { postService } from "../../services/postService.ts";
import { useEffect, useState } from "react";

function ProfilePage() {
  const { username } = useParams();
  const [user, setUser]       = useState(null);
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargo datos del usuario
  useEffect(() => {
    if (!username) return;
    setLoading(true);
    userService
      .getByUsername(username)
      .then(data => setUser(data))
      .catch(err => {
        console.error("Error al cargar usuario:", err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [username]);

  // Cargo últimos posts
  useEffect(() => {
    if (!username) return;
    postService
      .getByUsername(username)
      .then(data => {
        // Ordeno por fecha de posteo descendente y tomo 3
        const sorted = data.sort(
          (a, b) => new Date(b.datePost) - new Date(a.datePost)
        );
        setPosts(sorted.slice(0, 3));
      })
      .catch(err => console.error("Error al cargar posts:", err));
  }, [username]);

  if (loading) {
    return <p className="loading">Cargando...</p>;
  }
  if (!user) {
    return <h2 className="not-found">Usuario no encontrado</h2>;
  }

  return (
    <div className="Profile">
      <div className="Profile-details">
        <img className="avatar" alt="avatar" src="/avatar.jpg" />
        <div className="Profile-details-text">
          <p className="Username">{user.username}</p>
          <p className="Description">{user.description}</p>
          <div className="Twitter">
            <p className="Twitter-logo">𝕏</p>
            <p className="Twitter-value">{user.twitter}</p>
          </div>
        </div>
      </div>

      <div className="Stats">
        <div className="Stats-block Stats-block-a">
          <p className="Stats-block-value">{user.nBooks || 0}</p>
          <p className="Stats-block-text">BOOKS</p>
        </div>
        <div className="Stats-block">
          <p className="Stats-block-value">{user.thisYear || 0}</p>
          <p className="Stats-block-text">THIS YEAR</p>
        </div>
        <div className="Stats-block">
          <p className="Stats-block-value">{user.follows}</p>
          <p className="Stats-block-text">FOLLOWING</p>
        </div>
        <div className="Stats-block">
          <p className="Stats-block-value">{user.followers}</p>
          <p className="Stats-block-text">FOLLOWERS</p>
        </div>
      </div>

      <div className="LastBooks">
        <h3>Últimos libros agregados</h3>
        {posts.length > 0 ? (
          <div className="LastBooks-list">
            {posts.map(post => {
              const book = post.book;
              const link = `/${username}/books/${book.name
                .replace(/\s+/g, "-")
                .toLowerCase()}`;
              return (
                <NavLink key={post.id} to={link} className="BookCard">
                  <img
                    className="BookCard-cover"
                    src="/logobook.png"
                    alt={book.name}
                  />
                  <p className="BookCard-title">{book.name}</p>
                  <p className="BookCard-author">{book.writer}</p>
                </NavLink>
              );
            })}
          </div>
        ) : (
          <p className="no-books">Aún no hay libros en tu lista.</p>
        )}
      </div>
    </div>
  );
}

export { ProfilePage };
