import { BookContext } from '../BookContext';
import { NavLink, useNavigate } from 'react-router-dom';
import React from 'react';
import './HeaderNav.css'
import { AddBookModal } from '../Modals/addBookModal';
import { LogoutModal } from '../Modals/LogoutModal';
import { LoginModal } from '../Modals/LoginModal';
import { RegisterModal } from '../Modals/RegisterModal';
import { useAuth } from '../App/auth/AuthProvider';
function HeaderNav(){
    const { openAddBookModal, setOpenAddBookModal, 
            openLogoutModal, setOpenLogoutModal,
            openLoginModal, setOpenLoginModal,
            openRegisterModal, setOpenRegisterModal} = React.useContext(BookContext);
    const navigate = useNavigate();

    const auth = useAuth();
    const routes = [];
    if (auth.isAuthenticated){
        routes.push({
            to: '/'+auth.userLogin,
            text: auth.userLogin,
        });
        routes.push({
            to:'/'+auth.userLogin+'/books',
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
                        
                        { auth.isAuthenticated && <li onClick={() => {setOpenAddBookModal(!openAddBookModal)}} > log </li>}
                        { auth.isAuthenticated && <li onClick={() => {setOpenLogoutModal(!openLogoutModal)}}> Logout </li>}
                        { !auth.isAuthenticated && <li onClick={() => {setOpenLoginModal(!openLoginModal)}}> Login </li>}
                        { !auth.isAuthenticated && <li onClick={() => {setOpenRegisterModal(!openRegisterModal)}}> Register </li>}

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