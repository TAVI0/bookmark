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
}

export {BookLog};