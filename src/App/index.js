import { React } from 'react';
import { AuthProvider } from './auth';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { BookTablePage } from '../BookTablePage';
import { BookProvider } from '../BookContext';
import { ProfilePage } from '../ProfilePage';
import { HeaderNav } from '../HeaderNav';

function App() {
  return (
    <>
    <BrowserRouter>
      <AuthProvider>
        <BookProvider>
        <HeaderNav/>
          <Routes>
           <Route path="/:username" element={<ProfilePage />}/>
            <Route path="/:username/books" element={<BookTablePage/>}/> 
            <Route path="/" element={<p>HOLA MUNDO</p>}/> 
            <Route path="*" element={<p>Not found</p>}/>
          </Routes>
        </BookProvider>
     </AuthProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
