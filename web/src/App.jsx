import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import ListArticles from './features/list-articles/ListArticles';


const Layout = () => (
    <Outlet />
)


const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<ListArticles />} />
            </Route>
        </Routes>
    </BrowserRouter>
)

export default App;
