import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { BookContext } from "../../BookContext";
import { postService } from "../../services/postService.ts";
import { useAuth } from "../../App/auth/AuthProvider";
import { Heart, BookOpen } from "lucide-react";
import "./AddBookModal.css";

export function AddBookModal() {
  const { setOpenAddBookModal, currentBookId, onPostAdded } = useContext(BookContext);
  const { user } = useAuth();

  const [post, setPost] = useState({
    idUser:     user.id,
    idBook:     currentBookId,
    title:      "",
    dateStart:  new Date().toISOString().split("T")[0],
    dateEnd:    "",
    review:     "",
    spoiler:    false,
    liked:      false,
    readBefore: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { className, type, value, checked } = e.target;
    setPost((prev) => ({
      ...prev,
      [className]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const created = await postService.save(post);
      onPostAdded(created);
      setOpenAddBookModal(false);
    } catch {
      setError("Error al guardar. Intenta de nuevo.");
    }
  };

  const onClose = (e) => {
    e.preventDefault();
    setOpenAddBookModal(false);
  };

  const onBack = (e) => {
    e.preventDefault();
    setOpenAddBookModal(false);
  };

  const toggleField = (field) => {
    setPost((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return ReactDOM.createPortal(
    <div className="ModalBackground">
      <div className="ModalWindow">
        {/* HEADER */}
        <div className="ModalHeader">
          <button className="BackButton" onClick={onBack}>← Back</button>
          <span className="ModalTitle">I read...</span>
          <button className="CloseButton" onClick={onClose}>×</button>
        </div>

        {/* BODY */}
        <form className="ModalBody" onSubmit={onSubmit}>
          {/* COVER IMAGE */}
          <div className="ModalImage">
            <img src="/logobook.png" alt="Portada" />
          </div>

          {/* FORM CONTAINER */}
          <div className="ModalFormContainer">

            {/* BOOK META */}
            <div className="ModalMeta">
              <span className="BookTitle">
                {post.title || "Book Title"}
              </span>
            </div>

            {/* TITLE FIELD */}
            <div className="ModalField">
              <label>Título del libro</label>
              <input
                className="title"
                type="text"
                value={post.title}
                onChange={handleChange}
                placeholder="Nombre del libro..."
              />
            </div>

            {/* DATES */}
            <div className="ModalDates">
              <div className="ModalField flex-1">
                <label>Fecha inicio</label>
                <input
                  className="dateStart"
                  type="date"
                  value={post.dateStart}
                  onChange={handleChange}
                />
              </div>
              <div className="ModalField flex-1">
                <label>Fecha fin</label>
                <input
                  className="dateEnd"
                  type="date"
                  value={post.dateEnd}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* REVIEW AREA */}
            <div className="ModalField">
              <label>Reseña</label>
              <textarea
                className="review"
                value={post.review}
                onChange={handleChange}
                placeholder="Escribí tu review..."
              />
            </div>

            {/* SPOILER */}  
            <label className="CheckboxLabel">
              <input
                className="spoiler"
                type="checkbox"
                checked={post.spoiler}
                onChange={handleChange}
                disabled={!post.review.trim()}
              />
              Contains Spoilers
            </label>

            {error && <p className="error">{error}</p>}
          </div>
        </form>

        {/* FOOTER con Like, ReadBefore y Save */}
        <div className="ModalFooter">
          <div className="IconGroup">
            <button
              type="button"
              className={`IconButton ${post.readBefore ? "active" : ""}`}
              onClick={() => toggleField("readBefore")}
              title="Read Before"
            >
              <BookOpen />
            </button>
            <button
              type="button"
              className={`IconButton ${post.liked ? "active" : ""}`}
              onClick={() => toggleField("liked")}
              title="Like"
            >
              <Heart />
            </button>
          </div>
          <button
            className="Form-button Form-button--add lg-btn"
            onClick={onSubmit}
            disabled={!post.review.trim() && !post.spoiler}
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
