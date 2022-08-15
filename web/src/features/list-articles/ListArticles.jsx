import { Link } from 'react-router-dom';

import { articles } from 'data/articles';


const Article = ({ title, date, slug }) => (
    <Link to={slug}>
        <div>
            <span>{title}</span>
            <span>{date}</span>
        </div>
    </Link>
);

const ListArticles = () => (
    <ol>
        {articles.map(a => (
            <Article
                title={a.title}
                date={a.date}
                slug={a.slug}
            />
        ))}
    </ol>
);


export default ListArticles;
