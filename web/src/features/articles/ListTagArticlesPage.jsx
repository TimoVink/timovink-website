import { Link, useParams } from 'react-router-dom';
import Helmet from 'react-helmet';

import { getArticlesByTag } from 'data/articles';
import ArticleList from './ArticleList';
import HorizontalRule from 'features/common/HorizontalRule';


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
                <header className="text-center text-xl font-semibold text-orange-500">
                    Latest Posts: {tag.toUpperCase()}
                </header>
                <HorizontalRule />
                <ArticleList articles={articles} />
            </div>
        </>
    );
}


export default ListTagArticlesPage;
