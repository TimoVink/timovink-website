import { Link } from 'react-router-dom';
import { compareDesc } from 'date-fns';

import RelativeDate from 'features/common/RelativeDate';


const Tag = ({ tag }) => (
    <Link to={`/tags/${tag}`} className="py-0.5 px-1 text-orange-100 small-caps bg-orange-300 uppercase rounded">
        {tag}
    </Link>
)


const Article = ({ title, tags, date, slug }) => (
    <li className=''>
        <Link to={slug} className="space-y-1">
            <div className="sm:flex justify-between items-baseline">
                <div className="space-y-1">
                    <div className="text-xl font-medium">{title}</div>
                </div>
                <div className="text-slate-300">
                    <RelativeDate date={date} />
                </div>
            </div>
            <div className="text-[0.6rem] space-x-1">
                {tags.map(t => <Tag key={t} tag={t} />)}
            </div>
        </Link>
    </li>
);

const ArticleList = ({ articles }) => {
    articles.sort((a, b) => compareDesc(a.date, b.date));

    return (
        <div className="flex justify-center">
            <ol className="w-full space-y-6">
                {articles.map(a => (
                    <Article
                        title={a.title}
                        tags={a.tags}
                        date={a.date}
                        slug={a.slug}
                    />
                ))}
            </ol>
        </div>
    );
};


export default ArticleList;
