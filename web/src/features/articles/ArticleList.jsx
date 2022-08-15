import { Link } from 'react-router-dom';


const Article = ({ title, date, slug }) => (
    <Link to={slug}>
        <div>
            <span>{title}</span>
            <span>{date}</span>
        </div>
    </Link>
);

const ArticleList = ({ articles }) => (
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


export default ArticleList;
