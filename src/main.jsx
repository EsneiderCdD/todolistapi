import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TareasProvider } from './assets/componentes/TareasContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TareasProvider>
       <App />
    </TareasProvider>
  </StrictMode>,
)
