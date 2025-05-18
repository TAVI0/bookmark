import { BookOpen, Search, Star, List, Settings, LogOut } from 'lucide-react'
import { Button } from '../ui/button.jsx';
import { useAuth } from '../../App/auth/AuthProvider.js';
import React from 'react';
import { BookContext } from '../../BookContext/index.js';
import { LogoutModal } from '../../Modals/LogoutModal.js';


function FooterComponent(){
  const {openLogoutModal, setOpenLogoutModal} = React.useContext(BookContext);
  const auth = useAuth();


  return(
    <footer className="border-t border-[#677785]/20 py-8">
    <div className="container mx-auto flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
      <div className="flex items-center space-x-4">
        <BookOpen className="h-6 w-6 cursor-pointer text-[#8eacbb]" />
        <Search className="h-6 w-6 cursor-pointer text-[#8eacbb]" />
        <Star className="h-6 w-6 cursor-pointer text-[#8eacbb]" />
        <List className="h-6 w-6 cursor-pointer text-[#8eacbb]" />
        <Settings className="h-6 w-6 cursor-pointer text-[#8eacbb]" />
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="text-[#8eacbb] hover:text-[#8eacbb] hover:bg-[#677785]/20">
          Ayuda
        </Button>
        <Button variant="ghost" size="sm" className="text-[#8eacbb] hover:text-[#8eacbb] hover:bg-[#677785]/20">
          Privacidad
        </Button>
        <Button variant="ghost" size="sm" className="text-[#8eacbb] hover:text-[#8eacbb] hover:bg-[#677785]/20">
          Términos
        </Button>
          {auth.isAuthenticated && (
        <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-400/20" onClick={() => {setOpenLogoutModal(!openLogoutModal)}}>
          <LogOut 
            className="cursor-pointer" 
           
          />
          Cerrar sesión
        </Button>
          )}

      </div>
    </div>
    {openLogoutModal && <LogoutModal />}

  </footer>
)
}

export {FooterComponent}