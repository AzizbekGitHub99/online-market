import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header'
import Auth from './pages/Auth/Auth'
import Home from './pages/Home/Home'
import { useInfoContext } from './context/infoContext';
import Profile from './pages/Profile/Profile';

function App() {
  const { userId } = useInfoContext();
  const path = useLocation().pathname;
  const navigate = useNavigate();

  // Redirect from /register if userId exists
  if (userId && path === '/register') {
    // Redirect to previous path or home if previous path isn't available
    navigate(-1); // This will go back to the previous page, or:
    // navigate('/'); // Default to home if you want a specific path
  }

  return (
    <>
      {path !== '/register' && <Header />}
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="/profile" element={!userId ? <Navigate to="/" replace /> : <Profile />} />
        <Route path="/register" element={userId ? <Navigate to="/" replace /> : <Auth />}/>
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    </>
  );
}

export default App
