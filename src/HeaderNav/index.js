import { BookContext } from '../BookContext';
import { NavLink, useNavigate } from 'react-router-dom';
import React from 'react';
import { AddBookModal } from '../Modals/addBookModal';
import { LogoutModal } from '../Modals/LogoutModal';
import { LoginModal } from '../Modals/LoginModal';
import { RegisterModal } from '../Modals/RegisterModal';
import { useAuth } from '../App/auth/AuthProvider';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Bell } from 'lucide-react'
import { AvatarImage } from '@radix-ui/react-avatar';
function HeaderNav(){
    const { openAddBookModal, setOpenAddBookModal, 
            openLogoutModal, setOpenLogoutModal,
            openLoginModal, setOpenLoginModal,
            openRegisterModal, setOpenRegisterModal} = React.useContext(BookContext);
    const navigate = useNavigate();

    const auth = useAuth();

    return(
    
    <div className="flex items-center justify-between font-bold text-[#99aabb] bg-[#14181c] h-16">
        <img 
          className="w-16 cursor-pointer" 
          alt="logo" 
          src="/logo.png"  
          onClick={() => {navigate('/')}}
        />
        <nav className="flex items-center ml-auto mr-5 space-x-5">
          <ul className="flex items-center space-x-5 list-none">
            <Input className="w-64 bg-[#1c2026] border border-[#677785]/30 text-[#8eacbb]" placeholder="Buscar libros..." />
            
            {auth.isAuthenticated && ( <Avatar>
              <AvatarImage src="/avatar.jpg" alt="@usuario" />
              <AvatarFallback>TAVI0</AvatarFallback>
            </Avatar>)
        }
            {auth.isAuthenticated && (
            <NavLink className="text-[#99aabb] hover:text-[#8eacbb]" to={'/'+auth.userLogin}>
                  {auth.userLogin}
            </NavLink>
            )}
            {auth.isAuthenticated && (
            <NavLink className="text-[#99aabb] hover:text-[#8eacbb]" to={'/'+auth.userLogin+'/books'}>
                  Books
            </NavLink>
            )}
            {auth.isAuthenticated && (
            <li>
              <Bell className="h-6 w-6 cursor-pointer text-[#8eacbb]" />
            </li>
            )}
            {auth.isAuthenticated && (
                <li 
                className="cursor-pointer bg-[#00ac1b] text-white px-4 py-2 rounded-md hover:bg-green-600" 
                onClick={() => {setOpenAddBookModal(!openAddBookModal)}}
              >
                + log
              </li>
            )}
            
            {!auth.isAuthenticated && (
              <li 
                className="cursor-pointer" 
                onClick={() => {setOpenLoginModal(!openLoginModal)}}
              >
                Login
              </li>
            )}
            
            {!auth.isAuthenticated && (
              <li 
                className="cursor-pointer" 
                onClick={() => {setOpenRegisterModal(!openRegisterModal)}}
              >
                Register
              </li>
            )}
          </ul>
        </nav>
        
        {openAddBookModal && <AddBookModal />}
        {openLogoutModal && <LogoutModal />}
        {openLoginModal && <LoginModal />}
        {openRegisterModal && <RegisterModal />}
      </div>

    )
}

export {HeaderNav};