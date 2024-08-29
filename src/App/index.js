import { React } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ProfilePage } from '../ProfilePage/index.js';
import { BookTablePage } from '../BookTablePage/index.js';
import { BookProvider } from '../BookContext/index.js';
import { SettingsPage } from '../SettingsPage/index.js';

import { HeaderNav } from '../HeaderNav/index.js';
import { ProtectedRoute } from '../ProtectedRoute/index.js';
import { AuthProvider } from './auth/AuthProvider.js';
import { PostPage } from './PostPage/index.js';
import { HomePage } from './HomePage/index.js';
import { FooterComponent } from './FooterComponent/index.jsx';


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
            <Route path="/" element={<HomePage/>}/> 
            <Route path="*" element={<p>Not found</p>}  />
          </Routes>
        <FooterComponent/>
        </BookProvider>
      </AuthProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
