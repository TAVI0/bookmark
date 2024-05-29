import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BookContext } from "../../BookContext";

function LoginModal() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setOpenLoginModal } = React.useContext(BookContext);
  const [ error, setError] = React.useState(false);

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(username==="" || password ===""){
      setError(true)
      return
    }
    setError(false)
  }

  const onCancel = (event) => {
    event.preventDefault();
    setOpenLoginModal(false);
  };

  return ReactDOM.createPortal(
    <div className="ModalBackground">
      <form className="Form-buttonContainer"
        onSubmit={handleSubmit} >
        <label></label>
        <label>LOGIN</label>
        <label>Username</label>
        <input 
          type="text" 
          value={username}
          onChange={e => setUsername(e.target.value)}
          />
        <label>Password</label>
        <input 
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          />
        <button className="Form-button Form-button--add" type="submit">
          Entrar
        </button>
        <button
          className="Form-button Form-button--cancel"
          type="button"
          onClick={onCancel}
        >
          Cancelar
        </button>
      {error && <p>TODOS LOS CAMPOS SON OBLIGATORIOS</p>}
      </form>
    </div>,
    document.getElementById("modal")
  );
}

export { LoginModal };
