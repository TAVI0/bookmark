import React, { useEffect, useState } from "react";
import { BookContext } from "../../BookContext";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { GrTextAlignFull } from "react-icons/gr";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import './index.css'


function PostPage(){

    const { username, postName } = useParams();

    const postNameStr = postName.replace(/-+/g, ' ');
    const [post, setPost] = useState();
    const [loading, setLoading] = React.useState(true);
    const [spoilerView, setSpoilerView] = useState(true);

    const auth = useAuth();

    useEffect(() => {
        if (!username || !postNameStr) return;

        setLoading(true);
        const url=`http://localhost:8080/post/${username}/${postName}/1`;
        fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then((data) => {
            setPost(data);
            setLoading(false);
            setSpoilerView(data.spoiler); 
            console.log(data);
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
            setLoading(false);
        });
    }, [username, postNameStr, auth]);
    
    
    const {
        starsSistem,
    } = React.useContext(BookContext);
    
    if (loading) {
        return <p>Cargando...</p>;
    }
    
    console.log(post)
    const book = post.book;
    
    const {completedStars,halfStar} = starsSistem(post.rated);
    const HasReview = post.review != null && <GrTextAlignFull/>;
    const liked = post.liked ? <BsFillSuitHeartFill fill='red'/> : <BsFillSuitHeartFill fill='gray'/>;
    const dateObject = new Date(post.datePost);
    const formattedDate = dateObject.toLocaleDateString("en-GB"); // Formato "yyyy-mm-dd"
    
    const handleClick = () => {
      setSpoilerView(false);
      console.log("llegoaca")
    };
    return(
        <>
            <div className="book">
                <img className="logoBook"  src ="/logobook.png" alt="logo libro"/>
            </div>

            <div className="post">
                <h6>
                    Review by {post.userEntity.username}
                </h6>
                <div>
                    <h1 className="tittle">{book.name}</h1>
                    <div className="stars">
                        {completedStars}{halfStar}
                    </div>
                </div>
                <div className="review">
                    {spoilerView ? (
                        <p onClick={handleClick}>SPOILERS!!! Click aqui para continuar</p>
                    ) : (
                        post.review
                    )}
                </div>
            </div>

        </>
    )

}
export { PostPage }