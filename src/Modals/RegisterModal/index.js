import React from 'react';
import ReactDOM from 'react-dom';
import { BookContext } from '../../BookContext';
import { API_URL } from '../../dataApp';
import { useNavigate } from 'react-router-dom';

function RegisterModal(){
  //  const auth = useAuth();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const {setOpenRegisterModal} = React.useContext(BookContext);

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
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic dXNlcjo5YjFhNjA4Ny0wMzdjLTQyZGItYjMzZS05Y2YxNWFiMTcyZmQ='
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