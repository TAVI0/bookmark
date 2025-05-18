import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App/auth/AuthProvider';
import { BookContext } from '../BookContext';
import './Modal.css';

export function LogoutModal() {
  const navigate = useNavigate();
  const auth     = useAuth();
  const { setOpenLogoutModal } = React.useContext(BookContext);

  const handleLogout = (e) => {
    e.preventDefault();
    auth.logout();
    setOpenLogoutModal(false);
    navigate('/');
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setOpenLogoutModal(false);
  };

  return ReactDOM.createPortal(
    <div className="ModalBackground">
      <form className="ModalForm" onSubmit={handleLogout}>
        <h2>CERRAR SESIÓN</h2>
        <p>¿Seguro que quieres salir?</p>

        <div className="Form-buttonContainer">
          <button
            className="Form-button Form-button--cancel"
            type="button"
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button
            className="Form-button Form-button--add"
            type="submit"
          >
            Salir
          </button>
        </div>
      </form>
    </div>,
    document.getElementById('modal')
  );
}