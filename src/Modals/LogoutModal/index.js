import React from 'react';
import ReactDOM from 'react-dom';
import { BookContext } from '../../BookContext';
import { setAuthToken, useAuth } from '../../App/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

function LogoutModal(){
    const goTo = useNavigate();

    const auth = useAuth();
    const { setOpenLogoutModal } = React.useContext(BookContext);
    const logout = (e) => {
        e.preventDefault();
        setOpenLogoutModal(false);
        auth.setUserLogin("");
        auth.setIsAuthenticated(false);
        setAuthToken(null)
        goTo('/');

       // auth.logout();
    };

    const onCancel = (event) => {
        event.preventDefault();
        setOpenLogoutModal(false);
    };

    return ReactDOM.createPortal(
        <div className='ModalBackground'>
        <form className="Form-buttonContainer" onSubmit={logout}>
        <label>Logout</label>
            <label>¿Seguro que quieres salir?</label>
            <button className="Form-button Form-button--add" type='submit'>SALIR</button>       
            <button className="Form-button Form-button--cancel" type="button" onClick={onCancel}>Cancelar</button>         
        </form>
    </div>,
        document.getElementById('modal')
    )

}

export { LogoutModal };