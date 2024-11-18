import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { InfoProvider } from './context/infoContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { GoogleOAuthProvider } from '@react-oauth/google'
const client_id = import.meta.env.VITE_GOOGLE_CLIENT;
createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={client_id}>
          <InfoProvider>
            <App />
          </InfoProvider>
          <ToastContainer/>
      </GoogleOAuthProvider> 
    </BrowserRouter>
  </>,
)
