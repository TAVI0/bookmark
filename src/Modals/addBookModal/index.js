import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import { StarsBar } from "../../StarsBar";
import { BookContext } from "../../BookContext";

function AddBookModal(){

    const {
        setOpenAddBookModal,
    } = React.useContext(BookContext);
    const [newBookValue, setNewBookValue] = React.useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        setOpenAddBookModal(false);
    };

    const onCancel = (event) => {
        event.preventDefault();
        setOpenAddBookModal(false);
    };

    const onChange = (event) => {
        setNewBookValue(event.target.value);
    };

    return ReactDOM.createPortal(
        <div className='ModalBackground'>
            <form onSubmit={onSubmit}>
            <label>ADD TO YOUR BOOKS...</label>
            <div>
            <input type="date"></input><input type="date"></input>
            </div>
            <textarea
                placeholder="Nacidos de la bruma"
                value={newBookValue}
                onChange={onChange}
            />
            <div>
                <StarsBar/>
            </div>
            
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
                    Añadir
                </button>
            </div>
        </form>
        </div>,
        document.getElementById('modal')
    );
}

export { AddBookModal };