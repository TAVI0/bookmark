import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import { StarsBar } from "../../StarsBar";
import { BookContext } from "../../BookContext";

function AddBookModal(){
    const {
        setOpenAddBookModal,
    } = React.useContext(BookContext);

    

    const onSubmit = (event) => {
        const nameInput = document.querySelector('.name').value;
        const startDateInput = document.querySelector('.startDate').value;
        const endDateInput = document.querySelector('.endDate').value;
        const reviewInput = document.querySelector('.review').value;

        event.preventDefault();
        setOpenAddBookModal(false);
    };

    const onCancel = (event) => {
        event.preventDefault();
        setOpenAddBookModal(false);
    };

    return ReactDOM.createPortal(
        <div className='ModalBackground'>
            <form onSubmit={onSubmit}>
                <label>ADD TO YOUR BOOKS...</label>
                <div>
                <input className='name' type="text"></input>
                <input className='startDate' type="date"></input><input className='endDate' type="date"></input>
                </div>
                <textarea className='review'
                    placeholder="Nacidos de la bruma"
                />
                <div>
                    <StarsBar/>
                </div>
                
                <div className="Form-buttonContainer">
                    <button 
                        className="Form-button Form-button--cancel" type="button"
                        onClick={onCancel} >
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