import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import AboutPage from './pages/AboutPage'
import './index.css'

const App = () => {
  return (
    <BrowserRouter>
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-blue-600 text-xl tracking-tight">Rubens Ayres</div>
        <div className="flex gap-6 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-blue-600 transition-colors">Sobre Mim</Link>
        </div>
      </nav>

      <div className="pt-16"> {/* Padding to offset the fixed navbar */}
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
