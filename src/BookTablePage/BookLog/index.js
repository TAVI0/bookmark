import React from "react";
import { AiFillEdit } from 'react-icons/ai';
import { GrTextAlignFull } from 'react-icons/gr';
import { BsFillSuitHeartFill} from 'react-icons/bs';
import { BookContext } from "../../BookContext";
import { useApiBooks } from "../../BookContext/useApiBooks";

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
    <tr>{console.log(post)}
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
    
    /*
    const {completedStars,halfStar} = starsSistem(post.rated);
    const HasReview = post.review != null && <GrTextAlignFull/>;
    const liked = post.liked ? <BsFillSuitHeartFill fill='red'/> : <BsFillSuitHeartFill fill='gray'/>;
    return(

    <tr>
        <td></td>
        <td>{book.name}</td>
        <td>{book.writer}</td>
        <td></td>
        <td>{book.date}</td>
        <td>{completedStars}{halfStar}</td>
        <td>{HasReview}</td>
        <td>{liked}</td>
        <td><AiFillEdit/></td>
    </tr>
    )
*/
  /*
    const {completedStars,halfStar} = starsSistem(props.score);
    const { bookData } = useApiBooks(props.googId);
    const HasReview = props.review != null && <GrTextAlignFull/>;
    const liked = props.liked ? <BsFillSuitHeartFill fill='red'/> : <BsFillSuitHeartFill fill='gray'/>;
    return(

    <tr>
        <td><img src={bookData && bookData.volumeInfo.imageLinks.smallThumbnail} alt="" /></td>
        <td>{bookData && JSON.stringify(bookData.volumeInfo.title)}</td>
        <td>{bookData && JSON.stringify(bookData.volumeInfo.authors[0])}</td>
        <td>{bookData && JSON.stringify(bookData.volumeInfo.publishedDate)}</td>
        <td>{props.startedDate}-{props.complatedDate}</td>
        <td>{completedStars}{halfStar}</td>
        <td>{HasReview}</td>
        <td>{liked}</td>
        <td><AiFillEdit/></td>
    </tr>
    )

 */
}

export {BookLog};