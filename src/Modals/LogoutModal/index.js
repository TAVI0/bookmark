// src/Modals/LogoutModal/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { BookContext } from '../../BookContext';
import { useAuth } from '../../App/auth/AuthProvider';

export function LogoutModal() {
  const navigate = useNavigate();
  const auth     = useAuth();
  const { setOpenLogoutModal } = React.useContext(BookContext);

  const handleLogout = (e) => {
    e.preventDefault();
    // Cierra el modal
    setOpenLogoutModal(false);
    // Limpia el auth (token, user, estado)
    auth.logout();
    // Redirige al home
    navigate('/');
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setOpenLogoutModal(false);
  };

  return ReactDOM.createPortal(
    <div className="ModalBackground">
      <form className="Form-buttonContainer" onSubmit={handleLogout}>
        <label>Logout</label>
        <label>¿Seguro que quieres salir?</label>
        <button className="Form-button Form-button--add" type="submit">
          SALIR
        </button>
        <button
          className="Form-button Form-button--cancel"
          type="button"
          onClick={handleCancel}
        >
          Cancelar
        </button>
      </form>
    </div>,
    document.getElementById('modal')
  );
}
