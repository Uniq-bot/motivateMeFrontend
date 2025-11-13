import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Contexts/AuthContext.jsx'
import { PostProvider } from './Contexts/PostContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
   <PostProvider>
     <StrictMode>
    <App />
  </StrictMode>
   </PostProvider>
  </AuthProvider>,
)
