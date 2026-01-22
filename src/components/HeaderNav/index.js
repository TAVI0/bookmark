import { BookContext } from '../../BookContext';
import { NavLink, useNavigate } from 'react-router-dom';
import React from 'react';
import { AddBookModal } from '../../Modals/addBookModal';
import { LoginModal } from '../../Modals/LoginModal';
import { RegisterModal } from '../../Modals/RegisterModal';
import { useAuth } from '../../App/auth/AuthProvider';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Bell } from 'lucide-react';
import { AvatarImage } from '@radix-ui/react-avatar';

function HeaderNav() {
  const {
    openAddBookModal, setOpenAddBookModal,
    openLoginModal, setOpenLoginModal,
    openRegisterModal, setOpenRegisterModal
  } = React.useContext(BookContext);

  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <div className="flex items-center justify-between font-bold text-[#99aabb] bg-[#14181c] h-16 px-6">
      
      {/* Logo fijo, sin efectos y no arrastrable */}
      <div className="flex items-center">
        <img
          className="w-24 cursor-pointer"
          alt="BookTrack Logo"
          src="https://imgur.com/YcCiCS3.png"
          draggable="false"
          onClick={() => navigate('/')}
        />
      </div>

      {/* Navegación */}
      <nav className="flex items-center ml-auto mr-5 space-x-5">
        <ul className="flex items-center space-x-5 list-none">
          <Input
            className="w-64 bg-[#1c2026] border border-[#677785]/30 text-[#8eacbb]"
            placeholder="Buscar libros..."
          />

          {auth.isAuthenticated && (
            <>
              <Avatar>
                <AvatarImage src="/avatar.jpg" alt="@usuario" />
                <AvatarFallback>TAVI0</AvatarFallback>
              </Avatar>
              <NavLink
                className="text-[#99aabb] hover:text-[#8eacbb]"
                to={`/${auth.user.username}`}
              >
                {auth.userLogin}
              </NavLink>
              <NavLink
                className="text-[#99aabb] hover:text-[#8eacbb]"
                to={`/${auth.user.username}/books`}
              >
                Books
              </NavLink>
              <li>
                <Bell className="h-6 w-6 cursor-pointer text-[#8eacbb]" />
              </li>
              <li
                className="cursor-pointer bg-[#00ac1b] text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={() => setOpenAddBookModal(!openAddBookModal)}
              >
                + log
              </li>
            </>
          )}

          {!auth.isAuthenticated && (
            <>
              <li
                className="cursor-pointer"
                onClick={() => setOpenLoginModal(!openLoginModal)}
              >
                Login
              </li>
              <li
                className="cursor-pointer"
                onClick={() => setOpenRegisterModal(!openRegisterModal)}
              >
                Register
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Modales */}
      {openAddBookModal && <AddBookModal />}
      {openLoginModal &&   <LoginModal />}
      {openRegisterModal &&<RegisterModal />}
    </div>
  );
}

export { HeaderNav };
