import { Link, useParams } from 'react-router-dom';
import Helmet from 'react-helmet';

import { getArticlesByTag } from 'data/articles';
import ArticleList from './ArticleList';


const ListTagArticlesPage = () => {
    const { tag } = useParams();
    const articles = getArticlesByTag(tag);

    return (
        <>
            <Helmet>
                <title>Tag: {tag}</title>
            </Helmet>
            <div className="space-y-8">
                <Link to="/" className="text-sky-500">← Back to All Articles</Link>
                <ArticleList articles={articles} />
            </div>
        </>
    );
}


export default ListTagArticlesPage;
