import { React } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ProfilePage } from '../pages/ProfilePage/index.js';
import { BookTablePage } from '../pages/BookTablePage/index.js';
import { BookProvider } from '../BookContext/index.js';
import { SettingsPage } from '../pages/SettingsPage/index.js';

import { HeaderNav } from '../HeaderNav/index.js';
import { ProtectedRoute } from './ProtectedRoute/index.js';
import { AuthProvider } from './auth/AuthProvider.js';
import { PostPage } from '../pages/PostPage/index.js';
import { HomePage } from '../pages/HomePage/index.js';
import { FooterComponent } from '../FooterComponent/index.jsx';


function App() {
  return (
        <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <AuthProvider>
          <BookProvider>

            <HeaderNav/>

            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/:username" element={<ProfilePage />}/>
                <Route path="/:username/books" element={<BookTablePage/>}/>
                <Route path="/:username/books/:postName" element={<PostPage/>}/>
                <Route element={<ProtectedRoute />}>
                  <Route path="/settings" element={<SettingsPage />} />
                </Route>
                <Route path="*" element={<p>Not found</p>} />
              </Routes>
            </main>

            <FooterComponent/>

          </BookProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
