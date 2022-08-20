import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Helmet from 'react-helmet';

import Header from 'features/common/Header';

import ListArticlesPage from 'features/articles/ListArticlesPage';
import ListTagArticlesPage from 'features/articles/ListTagArticlesPage';
import ShowArticlePage from 'features/articles/ShowArticlePage';


const Layout = () => (
    <div className="flex justify-center bg-slate-50 min-h-screen">
        <div className="w-full max-w-3xl p-16 space-y-12 text-slate-600">
            <Header />
            <div className="flex justify-center">
                <div className="border-t border-slate-200 w-2/4" />
            </div>
            <Outlet />
        </div>
    </div>
);

const App = () => (
    <BrowserRouter>
        <Helmet
            defaultTitle="Timo Vink"
            titleTemplate="%s | Timo Vink"
        />
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
