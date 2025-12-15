import App from './app/App.tsx'
import ReactDom from 'react-dom/client'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import "./styles/global.css"

ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
