import React from "react";
import { AiFillEdit } from 'react-icons/ai';
import { GrTextAlignFull } from 'react-icons/gr';
import { BsFillSuitHeartFill} from 'react-icons/bs';
import { BookContext } from '../BookContext';
import './index.css'

function BookLog({post}){
    const {
        starsSistem,
    } = React.useContext(BookContext);

    const book = post.book;

    const {completedStars,halfStar} = starsSistem(post.rated);
    const HasReview = post.review != null && <GrTextAlignFull/>;
    const liked = post.liked ? <BsFillSuitHeartFill fill='red'/> : <BsFillSuitHeartFill fill='gray'/>;
    const dateObject = new Date(post.datePost);
    const formattedDate = dateObject.toLocaleDateString("en-GB"); // Formato "yyyy-mm-dd"
    return(
    <tr>
        <td></td>
        <td>{book.name}</td>
        <td>{book.writer}</td>
        <td></td>
        <td>-</td>
        <td>{formattedDate}</td>
        <td>{completedStars}{halfStar}</td>
        <td>{HasReview}</td>
        <td>{liked}</td>
        <td><AiFillEdit/></td>
    </tr>
    )
}

export {BookLog};