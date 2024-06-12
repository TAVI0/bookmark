import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import { StarsBar } from "../../StarsBar";
import { BookContext } from "../../BookContext";
import { POSTPOST } from "../../dataApp";
import axios from "axios";

function AddBookModal() {
  const { setOpenAddBookModal } = React.useContext(BookContext);
 // const auth = useAuth();
  const [post, setPost] = useState({
    idUser: 1,//auth.user.id,
    idBook: 3,
    datePost: new Date(),
    review: "",
    rated: 0,
    spoiler: false,
    liked: false,
    readBefore: false,
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(post);
    try {
      const response = await axios.post(POSTPOST, post);
      console.log("Respuesta del servidor:", response.data);
      // Realiza acciones adicionales con la respuesta
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
    setOpenAddBookModal(false);
  };

  const handleInput = (event) => {
    setPost({ ...post, [event.target.className]: event.target.value });
  };
  const handleBooleanInput = (event) => {
    setPost({ ...post, [event.target.className]: event.target.checked });
  };

  const onCancel = (event) => {
    event.preventDefault();
    setOpenAddBookModal(false);
  };

  return ReactDOM.createPortal(
    <div className="ModalBackground">
      <form onSubmit={onSubmit}>
        <label>ADD TO YOUR BOOKS...</label>
          <input className="name" type="text" placeholder="Nacidos de la bruma"/>
        <div>
          <input className="datePost" type="date" onChange={handleInput}/>
          <input className="endDate" type="date"/>
        </div>
        <textarea className="review" onChange={handleInput} placeholder="Escribi tu review aqui..."/>
        <div>
          Rated
          <input className="rated" type="number" onChange={handleInput}/>
        </div>
        <div>
          Spoiler
          <input className="spoiler" type="checkbox" onChange={handleBooleanInput}/>
        </div>
        <div>
          ReadBefore
          <input className="readBefore" type="checkbox" onChange={handleBooleanInput}/>
        </div>
        <div>
          Liked
          <input className="liked" type="checkbox" onChange={handleBooleanInput}/>
        </div>
        <div>
          <StarsBar />
        </div>
        <div className="Form-buttonContainer">
          <button className="Form-button Form-button--cancel" type="button" onClick={onCancel}>
            Cancelar
          </button>
          <button className="Form-button Form-button--add" type="submit">
            Añadir
          </button>
        </div>
      </form>
    </div>,
    document.getElementById("modal")
  );
}

export { AddBookModal };
