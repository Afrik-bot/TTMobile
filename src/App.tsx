import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import PrivateRoute from './components/PrivateRoute';
import Auth from './pages/Auth';
import Express from './pages/Express';
import Connect from './pages/Connect';
import Studio from './pages/Studio';
import Live from './pages/Live';
import Profile from './pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<PrivateRoute><Express /></PrivateRoute>} />
            <Route path="/connect" element={<PrivateRoute><Connect /></PrivateRoute>} />
            <Route path="/studio" element={<PrivateRoute><Studio /></PrivateRoute>} />
            <Route path="/live" element={<PrivateRoute><Live /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          </Routes>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}