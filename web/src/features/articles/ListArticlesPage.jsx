import { articles } from 'data/articles';
import HorizontalRule from 'features/common/HorizontalRule';
import ArticleList from './ArticleList';


const ListArticlesPage = () => (
    <>
        <header className="text-center font-semibold text-orange-500 text-xl">
            Latest Posts
        </header>
        <HorizontalRule />
        <ArticleList articles={articles} />
    </>
);


export default ListArticlesPage;
