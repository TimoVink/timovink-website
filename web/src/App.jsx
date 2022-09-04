import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import Helmet from 'react-helmet';

import { queryClient } from './queryClient';

import Layout from 'features/common/Layout';
import ListArticlesPage from 'features/articles/ListArticlesPage';
import ListTagArticlesPage from 'features/articles/ListTagArticlesPage';
import ShowArticlePage from 'features/articles/ShowArticlePage';


const App = () => (
    <>
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
    </>
)

const Root = () => (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </QueryClientProvider>
)


export default Root;
