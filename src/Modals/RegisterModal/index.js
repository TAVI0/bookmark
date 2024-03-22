import React from 'react';
import ReactDOM from 'react-dom';
import { useAuth } from '../../App/auth';
import { BookContext } from '../../BookContext';

function RegisterModal(){
    const auth = useAuth();
    const [username, setUsername] = React.useState('');
    const {setOpenRegisterModal} = React.useContext(BookContext);

    
    const login = (e) => {
        e.preventDefault();
        setOpenRegisterModal(false);
        auth.login({ username });
    };

      const onCancel = (event) => {
        event.preventDefault();
        setOpenRegisterModal(false);
    };

    return  ReactDOM.createPortal(
        <div className='ModalBackground'>
            <form className="Form-buttonContainer" onSubmit={login}>
                <label>Register </label>
                <label>Username: </label>
                <input 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button className="Form-button Form-button--add" type='submit'>Entrar</button>
                <button className="Form-button Form-button--cancel" type="button" onClick={onCancel}>Cancelar</button>                    
            </form>
        </div>,
        document.getElementById('modal')
    )
}

export { RegisterModal };