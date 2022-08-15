import { parseISO } from 'date-fns';

import HelloWorld from './hello-world.mdx';
import TestTwo from './test-two.mdx';


export const articles = [
    {
        src: HelloWorld,
        title: 'Hello, World!',
        slug: 'hello-world',
        date: parseISO('2022-08-14T02:31:00Z'),
        tags: ['website']
    },
    {
        src: TestTwo,
        title: 'Test Two',
        slug: 'test-two',
        date: parseISO('2022-08-15T02:31:00Z'),
        tags: ['website', 'test']
    }
]

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
