import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import ListArticlesPage from './features/articles/ListArticlesPage';
import ListTagArticlesPage from './features/articles/ListTagArticlesPage';
import ShowArticlePage from './features/articles/ShowArticlePage';


const Layout = () => (
    <Outlet />
)


const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<ListArticlesPage />} />
                <Route path=":slug" element={<ShowArticlePage />} />
                <Route path="tags">
                    <Route path=":tag" element={<ListTagArticlesPage />} />
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
)

export default App;
