import React from "react";
import { AiFillStar } from 'react-icons/ai';
import { FaStarHalf } from 'react-icons/fa';
import { booklog } from '../dataApp';

const BookContext = React.createContext();

function BookProvider( {children} ){
    const [openAddBookModal, setOpenAddBookModal] = React.useState(false);
    const [openLogoutModal, setOpenLogoutModal] = React.useState(false);
    const [openLoginModal, setOpenLoginModal] = React.useState(false);
    const [openRegisterModal, setOpenRegisterModal] = React.useState(false);

    const starsSistem= (score) =>{
      const roundedScore = Math.round(score * 2) / 2;
      const stars = Array(Math.floor(roundedScore / 2)).fill(null);
      const completedStars = stars.map((star, index) => (<AiFillStar key={index} />));
      const halfStar = score % 2 === 1 && <FaStarHalf />;
      return {completedStars,halfStar}
    }

    const [booklogs, setbooklogs] = React.useState(booklog);


    return(
    <BookContext.Provider value={{
        openAddBookModal, setOpenAddBookModal,
        openLogoutModal, setOpenLogoutModal,
        openLoginModal, setOpenLoginModal,
        openRegisterModal, setOpenRegisterModal,
        starsSistem,
        booklogs,
        setbooklogs
    }}>
        {children}
    </BookContext.Provider>
  );
}
export {BookContext, BookProvider};