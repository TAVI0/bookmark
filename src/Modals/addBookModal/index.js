import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import { StarsBar } from "../../components/StarsBar";
import { BookContext } from "../../BookContext";
import { postService } from "../../services/postService.ts"; 
import { useAuth } from "../../App/auth/AuthProvider";
function AddBookModal() {
  const { setOpenAddBookModal, currentBookId, onPostAdded } = useContext(BookContext);
  const auth = useAuth();
  const [post, setPost] = useState({
    idUser: auth.user.id,
    idBook: currentBookId,
    dateStart: new Date().toISOString().split("T")[0],
    dateEnd: "",
    review: "",
    rated: 0,
    spoiler: false,
    liked: false,
    readBefore: false,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const created = await postService.save(post);
      console.log("Post creado:", created);
      // si quieres refrescar la lista tras crearlo:
      onPostAdded(created);
      setOpenAddBookModal(false);
    } catch (err) {
      console.error("Error al crear post:", err);
    }
  };

  const handleChange = (e) => {
    const { className, type, value, checked } = e.target;
    setPost(prev => ({
      ...prev,
      [className]: type === "checkbox" ? checked : value,
    }));
  };

  const onCancel = (e) => {
    e.preventDefault();
    setOpenAddBookModal(false);
  };

  return ReactDOM.createPortal(
    <div className="ModalBackground">
      <form onSubmit={onSubmit} className="ModalForm">
        <h2>Agregar a tu estantería</h2>

        <div className="ModalField">
          <label>Fecha de inicio</label>
          <input
            className="dateStart"
            type="date"
            value={post.dateStart}
            onChange={handleChange}
          />
        </div>

        <div className="ModalField">
          <label>Fecha de fin</label>
          <input
            className="dateEnd"
            type="date"
            value={post.dateEnd}
            onChange={handleChange}
          />
        </div>

        <div className="ModalField">
          <label>Reseña</label>
          <textarea
            className="review"
            value={post.review}
            onChange={handleChange}
            placeholder="Escribí tu review aquí..."
          />
        </div>

        <div className="ModalField">
          <label>Calificación</label>
          <input
            className="rated"
            type="number"
            min="0"
            max="5"
            value={post.rated}
            onChange={handleChange}
          />
        </div>

        <div className="ModalSwitches">
          <label>
            <input
              className="spoiler"
              type="checkbox"
              checked={post.spoiler}
              onChange={handleChange}
            /> Contiene spoiler
          </label>
          <label>
            <input
              className="readBefore"
              type="checkbox"
              checked={post.readBefore}
              onChange={handleChange}
            /> Lo había leído antes
          </label>
          <label>
            <input
              className="liked"
              type="checkbox"
              checked={post.liked}
              onChange={handleChange}
            /> Me gustó
          </label>
        </div>

        <div className="ModalField">
          <StarsBar rating={post.rated} onChange={(val) => setPost(prev => ({ ...prev, rated: val }))} />
        </div>

        <div className="Form-buttonContainer">
          <button
            className="Form-button Form-button--cancel"
            type="button"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="Form-button Form-button--add"
            type="submit"
          >
            Añadir
          </button>
        </div>
      </form>
    </div>,
    document.getElementById("modal")
  );
}

export { AddBookModal };
