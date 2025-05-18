import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { BookContext } from "../BookContext/index.js";
import { useAuth } from "../App/auth/AuthProvider.js";
import { authService } from "../services/authService.ts";
import "./Modal.css";

function LoginModal() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const { setOpenLoginModal }   = useContext(BookContext);
  const auth                     = useAuth();
  const navigate                 = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");
    try {
      const loginDto = await authService.login({ username, password });
      auth.saveUser({
        token:    loginDto.token,
        id:       loginDto.id,
        username: loginDto.username,
      });
      setOpenLoginModal(false);
      navigate(`/${loginDto.username}`);
    } catch {
      setError("Credenciales inválidas");
    }
  };

  const onCancel = (e) => {
    e.preventDefault();
    setOpenLoginModal(false);
  };

  return ReactDOM.createPortal(
    <div className="ModalBackground">
      <form className="ModalForm" onSubmit={handleSubmit}>
        <h2>INGRESAR</h2>

        <label>Usuario</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <div className="Form-buttonContainer">
          <button className="Form-button Form-button--cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button className="Form-button Form-button--add" type="submit">
            Entrar
          </button>
        </div>
      </form>
    </div>,
    document.getElementById("modal")
  );
}

export { LoginModal };