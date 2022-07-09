import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/home-page/HomePage'
import { PostContent } from './pages/post-content/PostContent'
import { ImageGallery } from './pages/images-gallery/ImageGallery'

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='post/:postID' element={<PostContent />} />
                <Route path='/secret-gallery' element={<ImageGallery />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
