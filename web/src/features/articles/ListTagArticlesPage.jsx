import { useParams } from 'react-router-dom';

import { getArticlesByTag } from 'data/articles';
import ArticleList from './ArticleList';


const ListTagArticlesPage = () => {
    const { tag } = useParams();
    const articles = getArticlesByTag(tag);
    return <ArticleList articles={articles} />;
}


export default ListTagArticlesPage;
