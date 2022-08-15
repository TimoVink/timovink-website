import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import ListArticles from './features/list-articles/ListArticles';
import ShowArticle from './features/show-article/ShowArticle';


const Layout = () => (
    <Outlet />
)


const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<ListArticles />} />
                <Route path=":slug" element={<ShowArticle />} />
            </Route>
        </Routes>
    </BrowserRouter>
)

export default App;
