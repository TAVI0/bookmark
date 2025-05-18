import React from 'react';
import ReactDOM from 'react-dom';
import { BookContext } from '../BookContext';
import { useNavigate } from 'react-router-dom';
import './Modal.css';  

export function RegisterModal() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { setOpenRegisterModal } = React.useContext(BookContext);
  const navigate = useNavigate();

  const onCancel = (e) => {
    e.preventDefault();
    setOpenRegisterModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí podrías añadir validaciones si las necesitas
    try {
      const API_URL = process.env.REACT_APP_API_URL ?? '';
      const response = await fetch(`${API_URL}user/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setOpenRegisterModal(false);
        navigate(`/${username}`);
      } else {
        console.error('Error al crear usuario');
      }
    } catch (err) {
      console.error('Error de red:', err);
    }
  };

  return ReactDOM.createPortal(
    <div className="ModalBackground">
      <form className="ModalForm" onSubmit={handleSubmit}>
        <h2>REGISTRARSE</h2>

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
            Crear
          </button>
        </div>
      </form>
    </div>,
    document.getElementById('modal')
  );
}
