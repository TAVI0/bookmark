import React from 'react';
import ReactDOM from 'react-dom';
import { BookContext } from '../../BookContext';
import { useNavigate } from 'react-router-dom';

function RegisterModal(){
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const {setOpenRegisterModal} = React.useContext(BookContext);
    const API_URL = process.env.REACT_APP_API_URL ?? '';

    const goTo = useNavigate();

      const onCancel = (event) => {
        event.preventDefault();
        setOpenRegisterModal(false);
    };

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const response = await fetch(`${API_URL}user/save`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
            });
        if(response.ok){
            setOpenRegisterModal(false);
            goTo('/'+username);
            console.log("EL USUARIO SE CREO CORRECTAMENTE")
        }else{
            console.log("Algo malio sal")
        }
        }catch(error){
            console.log(error)
        }
    }

    return  ReactDOM.createPortal(
        <div className='ModalBackground'>
            <form className="Form-buttonContainer" onSubmit={handleSubmit}>
                <label>Register </label>
                <label>Username: </label>
                <input 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <label>Password: </label>
                <input 
                    value={password}
                    type='password'
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="Form-button Form-button--add" type='submit'>Crear</button>
                <button className="Form-button Form-button--cancel" type="button" onClick={onCancel}>Cancelar</button>                    
            </form>
        </div>,
        document.getElementById('modal')
    )
}

export { RegisterModal };