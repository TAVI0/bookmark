import React from "react";
import ReactDOM from "react-dom";
import { BookContext } from "../../BookContext";
import { useAuth } from "../../App/auth/AuthProvider";
import { API_URL } from "../../dataApp";
import { useNavigate } from "react-router-dom";

function LoginModal() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setOpenLoginModal } = React.useContext(BookContext);
  const [ error, setError] = React.useState(false);
  const goTo = useNavigate();

  const auth = useAuth();


  async function handleSubmit(e){
    e.preventDefault();
    try{
        const response = await fetch(`${API_URL}auth/login`,{
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
        setOpenLoginModal(false);

        const responseData = await response.json();
        if(responseData!=null){
          auth.saveUser(responseData);
        }
        goTo('/'+responseData.username);
        console.log("EL USUARIO SE LOGEO CORRECTAMENTE")
    }else{
        console.log("Algo malio sal")
    }
    }catch(error){
        console.log(error)
    }
}


  const onCancel = (event) => {
    event.preventDefault();
    setOpenLoginModal(false);
  };

  return ReactDOM.createPortal(
    <div className="ModalBackground">
      <form className="Form-buttonContainer" onSubmit={handleSubmit} >
        <label></label>
        <label>LOGIN</label>
        <label>Username</label>
        <input 
          type="text" 
          value={username}
          onChange={e => setUsername(e.target.value)}
          />
        <label>Password</label>
        <input 
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          />
        <button className="Form-button Form-button--add" type="submit">
          Entrar
        </button>
        <button
          className="Form-button Form-button--cancel"
          type="button"
          onClick={onCancel}
        >
          Cancelar
        </button>
      {error && <p>TODOS LOS CAMPOS SON OBLIGATORIOS</p>}
      </form>
    </div>,
    document.getElementById("modal")
  );
}

export { LoginModal };
