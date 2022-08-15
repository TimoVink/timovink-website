import HelloWorld from './hello-world.mdx';
import TestTwo from './test-two.mdx';

export const articles = [
    {
        src: HelloWorld,
        title: 'Hello, World!',
        slug: 'hello-world',
        date: '2022-08-14',
        tags: ['website']
    },
    {
        src: TestTwo,
        title: 'Test Two',
        slug: 'test-two',
        date: '2022-08-15',
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
