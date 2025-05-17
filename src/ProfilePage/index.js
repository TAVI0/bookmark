import { useParams } from "react-router-dom";
import './ProfilePage.css'
import { userService } from "../services/userService.ts";

function ProfilePage(){
    
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
    if (!username) return;

    setLoading(true);
    userService
      .getByUsername(username)
      .then(data => {
        setUser(data);
      })
      .catch(err => {
        console.error("Error al cargar usuario:", err);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

   if (loading) {
    return <p>Cargando...</p>;
  }
  if (!user) {
    return <h2>User not found!</h2>;
  }

    return (
        <div className="Profile">
        <div className="Profile-details">
            <img className="avatar" alt="avatar" src="/avatar.jpg"/>
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
            <p className="Stats-block-value">NBook</p>
            <p className="Stats-block-text">BOOKS</p>
            </div>
            <div className="Stats-block">
            <p className="Stats-block-value">bookY</p>
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
        </div>
    );

}
export { ProfilePage }