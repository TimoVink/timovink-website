import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Helmet from 'react-helmet';

import { getArticleBySlug } from 'data/articles';
import RelativeDate from 'features/common/RelativeDate';
import SyntaxHighlightedCode from 'data/SyntaxHighlightedCode';

import Giscus from '@giscus/react';


const HorizontalRule = () => (
    <div className="flex justify-center my-8">
        <div className="border-t border-slate-200 w-3/4" />
    </div>
);

const Article = ({ article }) => (
    <article className="prose max-w-none">
        <header className="md:flex flex-row-reverse justify-between items-baseline">
            <div className="text-slate-300">
                <RelativeDate date={article.date} />
            </div>
            <h1 className="text-2xl sm:text-4xl">{article.title}</h1>
        </header>
        <main>
            <React.Suspense>
                <article.src components={{ code: SyntaxHighlightedCode }} />
            </React.Suspense>
        </main>
        <HorizontalRule />
        <footer>
            <Giscus
                repo="TimoVink/tv-personalsite"
                repoId="R_kgDOHcyClQ"
                category="Comments"
                categoryId="DIC_kwDOHcyClc4CROs2"
                mapping="title"
            />
        </footer>
    </article>
);

const ShowArticlePage = () => {
    const { slug } = useParams();
    const article = getArticleBySlug(slug);

    return (
        <>
            <Helmet>
                <title>{article.title}</title>
            </Helmet>
            <div className="space-y-8">
                <Link to="/" className="text-sky-500">← Back to All Articles</Link>
                <Article article={article} />
            </div>
        </>
    );
};


export default ShowArticlePage;
