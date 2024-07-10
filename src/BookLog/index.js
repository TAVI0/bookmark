import React from "react";
import { AiFillEdit } from 'react-icons/ai';
import { GrTextAlignFull } from 'react-icons/gr';
import { BsFillSuitHeartFill} from 'react-icons/bs';
import { BookContext } from '../BookContext';
import './index.css'
import { NavLink } from "react-router-dom";

function BookLog({post}){
    const {
        starsSistem,
    } = React.useContext(BookContext);

    const book = post.book;
    const user = post.userEntity;

    const {completedStars,halfStar} = starsSistem(post.rated);
    const HasReview = post.review != null && <GrTextAlignFull/>;
    const liked = post.liked ? <BsFillSuitHeartFill fill='red'/> : <BsFillSuitHeartFill fill='gray'/>;
    const dateObject = new Date(post.datePost);
    const formattedDate = dateObject.toLocaleDateString("en-GB"); // Formato "yyyy-mm-dd"
    const bookNameLink = book.name.replace(/\s+/g, '-');
    return(
    <tr>
        {console.log(book)}
        <td><img className="logoBook"  src ="/logobook.png" alt="logo libro"/></td>
        <td><NavLink className="BookName" to={'/'+user.username+'/books/'+bookNameLink} >{book.name}</NavLink></td>
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