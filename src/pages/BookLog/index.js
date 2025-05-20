import React from "react";
import { AiFillEdit } from 'react-icons/ai';
import { GrTextAlignFull } from 'react-icons/gr'; 
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { BookContext } from "../../BookContext";
import { NavLink } from "react-router-dom";
import "./index.css";

function BookLog({ post }) {
  const { starsSistem } = React.useContext(BookContext);
  const book = post.book;
  const user = post.userEntity;
  const { completedStars, halfStar } = starsSistem(post.rated);

  const hasReview = post.review ? <GrTextAlignFull /> : null;
  const likedIcon = post.liked
    ? <BsFillSuitHeartFill className="icon liked" />
    : <BsFillSuitHeartFill className="icon not-liked" />;

  const startDate = post.dateStart
    ? new Date(post.dateStart).toLocaleDateString("es-AR")
    : "-";
  const endDate = post.dateEnd
    ? new Date(post.dateEnd).toLocaleDateString("es-AR")
    : "-";

  const bookLink = book.name.replace(/\s+/g, '-').toLowerCase();

  return (
    <tr>
      <td>
        <img
          className="book-cover"
          src="/logobook.png"
          alt={`Portada de ${book.name}`}
        />
      </td>
      <td>
        <NavLink
          className="book-title"
          to={`/${user.username}/books/${bookLink}`}
        >
          {book.name}
        </NavLink>
      </td>
      <td className="author">{book.writer}</td>
      <td className="date-cell">{book.dateStart}</td>
      <td className="dash-cell">–</td>
      <td className="date-cell">{book.dateEnd}</td>
      <td className="rating">
        {completedStars}
        {halfStar}
      </td>
      <td className="icon-cell">{hasReview}</td>
      <td className="icon-cell">{likedIcon}</td>
      <td className="icon-cell edit-icon">
        <AiFillEdit />
      </td>
    </tr>
  );
}

export { BookLog };
