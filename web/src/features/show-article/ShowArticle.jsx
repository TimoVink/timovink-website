import { useParams } from 'react-router-dom';

import { getArticleBySlug } from 'data/articles';


const ShowArticle = () => {
    const { slug } = useParams();
    const article = getArticleBySlug(slug);

    return (
        <article>
            <h1>
                <span>{article.title}</span>
                <span>{article.date}</span>
            </h1>
            <article.src />
        </article>
    )
};


export default ShowArticle;
