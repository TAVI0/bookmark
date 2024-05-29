import React from 'react';
import ReactDOM from 'react-dom';
import { BookContext } from '../../BookContext';

function LogoutModal(){
   // const auth = useAuth();
    const { setOpenLogoutModal } = React.useContext(BookContext);
    const logout = (e) => {
        e.preventDefault();
        setOpenLogoutModal(false);
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