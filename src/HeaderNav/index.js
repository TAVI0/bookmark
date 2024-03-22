import { BookContext } from '../BookContext';
import { NavLink, useNavigate } from 'react-router-dom';
import React from 'react';
import './HeaderNav.css'
import { AddBookModal } from '../Modals/addBookModal';
import { useAuth } from '../App/auth';
import { LogoutModal } from '../Modals/LogoutModal';
import { LoginModal } from '../Modals/LoginModal';
import { RegisterModal } from '../Modals/RegisterModal';
function HeaderNav(){
    const { openAddBookModal, setOpenAddBookModal, 
            openLogoutModal, setOpenLogoutModal,
            openLoginModal, setOpenLoginModal,
            openRegisterModal, setOpenRegisterModal} = React.useContext(BookContext);
    const navigate = useNavigate();
    const auth = useAuth();

    const routes = [];
    if (auth.user?.username !== undefined) {
        routes.push({
            to: '/'+auth.user?.username,
            text: auth.user?.username,
        });
        routes.push({
            to:'/'+auth.user?.username+'/books',
            text:'Books',
        });
   }

    return(
        <>
            <div className='Header'>
                <img className='imgLogo' alt='logo' src="/logo.png"  onClick={() => {navigate('/')}} />
                <nav className='HeaderNav'>
                    <ul className='UlNav'>
                        {routes.map(route => (
                            <li key={route.to}>
                                <NavLink to={route.to}>{route.text}</NavLink>
                            </li>
                        ))}
                        
                        { auth.user && <li onClick={() => {setOpenAddBookModal(!openAddBookModal)}} > log </li>}
                        { auth.user && <li onClick={() => {setOpenLogoutModal(!openLogoutModal)}}> Logout </li>}
                        { !auth.user && <li onClick={() => {setOpenLoginModal(!openLoginModal)}}> Login </li>}
                        { !auth.user && <li onClick={() => {setOpenRegisterModal(!openRegisterModal)}}> Register </li>}

                    </ul>
                </nav>
            
            {openAddBookModal && (
                <AddBookModal/>  
            )}
            {openLogoutModal && (
                <LogoutModal/>  
            )}
            {openLoginModal && (
                <LoginModal/>  
            )}
            {openRegisterModal && (
                <RegisterModal/>  
            )}
            </div>
        </>
    )
}

export {HeaderNav};