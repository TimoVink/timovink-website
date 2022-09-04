import React from 'react';
import { parseISO } from 'date-fns';

import metadata from './articles/articles.json';


export const articles = [];
for (const m of metadata) {

    // The webpackMode means the MDX file will not become a separate JS chunk after optimization. This also
    // means, the promise returned by the import(...) will already be completed, and thus there won't be any
    // flashes when content loads.
    //
    // If the bundle starts growing too large in the future we can switch to the default 'lazy' webpackMode,
    // but we will also have to start providing a proper loading animation to the Suspense component.

    articles.push({
        src: React.lazy(() => import(/* webpackMode: 'eager' */ `../${m.path}`)),
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
