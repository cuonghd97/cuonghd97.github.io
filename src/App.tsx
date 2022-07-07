import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home-page/HomePage';
import { PostContent } from './pages/post-content/PostContent';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="post/:postID" element={<PostContent />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
