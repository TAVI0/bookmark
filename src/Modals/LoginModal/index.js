import React from 'react';
import ReactDOM from 'react-dom';
import { useAuth } from '../../App/auth';
import { BookContext } from '../../BookContext';
import { userLog } from '../../dataApp';

function LoginModal(){
    const auth = useAuth();
    const [username, setUsername] = React.useState('');
    const {setOpenLoginModal} = React.useContext(BookContext);

    
    const login = (e) => {
        e.preventDefault();
        const user = userLog.find(elemento => elemento.username === username)
        if (user){
            setOpenLoginModal(false);
            auth.login({user});
        }else{
            alert("Usuario no registrado");
        }
        
    };

      const onCancel = (event) => {
        event.preventDefault();
        setOpenLoginModal(false);
    };

    return  ReactDOM.createPortal(
        <div className='ModalBackground'>
            <form className="Form-buttonContainer" onSubmit={login}>
                <label></label>
                <label>LOGIN </label>
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

export { LoginModal };