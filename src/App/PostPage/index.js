import React from "react";
import { BookContext } from "../../BookContext";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { GrTextAlignFull } from "react-icons/gr";
import { useParams } from "react-router-dom";


function PostPage(){

    const { username, post } = useParams();

    const postName = post.replace(/-+/g, ' ');


    //const {data:posts, loading} = useFetch("http://localhost:8080/post/username/",username);

    const {
        starsSistem,
    } = React.useContext(BookContext);

    console.log(postName)
    const book = post.book;

 //   const {completedStars,halfStar} = starsSistem(post.rated);
    const HasReview = post.review != null && <GrTextAlignFull/>;
    const liked = post.liked ? <BsFillSuitHeartFill fill='red'/> : <BsFillSuitHeartFill fill='gray'/>;
    const dateObject = new Date(post.datePost);
    const formattedDate = dateObject.toLocaleDateString("en-GB"); // Formato "yyyy-mm-dd"
    

    return(
        <>
        <div className="book">
            <img className="logoBook"  src ="/logobook.png" alt="logo libro"/>
        </div>

        </>
    )

}
export { PostPage }