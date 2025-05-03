import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserContext from './Context/UserContext.jsx'
import CaptainContext from './Context/CaptainContext.jsx'

createRoot(document.getElementById('root')).render(
  <CaptainContext>
    <UserContext>
      <StrictMode>
        <App />
      </StrictMode>,
    </UserContext>
  </CaptainContext>
)
