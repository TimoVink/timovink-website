import { parseISO } from 'date-fns';

import metadata from './articles.json';


export const articles = [];
for (const m of metadata) {
    articles.push({
        src: (await import(`../${m.path}`)).default,
        title: m.title,
        slug: m.slug,
        date: parseISO(m.date),
        tags: m.tags
    });
}

const slugLookup = {};
const tagLookup = {};
for (const article of articles) {
    slugLookup[article.slug] = article;
    for (const tag of article.tags) {
        if (!(tag in tagLookup)) {
            tagLookup[tag] = []
        }
        tagLookup[tag].push(article);
    }
}

export const getArticleBySlug = (slug) => slugLookup[slug];
export const getArticlesByTag = (tag) => tagLookup[tag];
