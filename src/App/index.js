import { React } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ProfilePage } from '../ProfilePage';
import { BookTablePage } from '../BookTablePage';
import { BookProvider } from '../BookContext';
import { SettingsPage } from '../SettingsPage';

import { HeaderNav } from '../HeaderNav';
import { ProtectedRoute } from '../ProtectedRoute';
import { AuthProvider } from './auth/AuthProvider';
import { PostPage } from './PostPage';


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
            <Route path="/:username/books/:postName" element={<PostPage/>}/>       
            <Route element={<ProtectedRoute />}>
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            <Route path="/" element={<p>HOLA MUNDO</p>}/> 
            <Route path="*" element={<p>Not found</p>}  />
          </Routes>
        </BookProvider>
      </AuthProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
