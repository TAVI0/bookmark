import React from "react";
import { AiFillEdit } from 'react-icons/ai';
import { GrTextAlignFull } from 'react-icons/gr';
import { BsFillSuitHeartFill} from 'react-icons/bs';
import { BookContext } from "../../BookContext";

function BookLog(props){
    const {
        starsSistem,
    } = React.useContext(BookContext);


    const post = props.post;
    const book = post.book;

    const {completedStars,halfStar} = starsSistem(post.rated);
    const HasReview = post.review != null && <GrTextAlignFull/>;
    const liked = post.liked ? <BsFillSuitHeartFill fill='red'/> : <BsFillSuitHeartFill fill='gray'/>;
    return(
    <tr>
        <td></td>
        <td>{book.name}</td>
        <td>{book.writer}</td>
        <td></td>
        <td>{post.date}</td>
        <td>{completedStars}{halfStar}</td>
        <td>{HasReview}</td>
        <td>{liked}</td>
        <td><AiFillEdit/></td>
    </tr>
    )
}

export {BookLog};