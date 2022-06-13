import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/home-page/HomePage'

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="users/*" element={<p>User</p>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
