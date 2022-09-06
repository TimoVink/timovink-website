const path = require('path');
const fs = require('fs');
var proc = require('child_process');
var _ = require('lodash');


const siteRoot = 'https://timovink.dev';
const repoRootDir = path.normalize(path.join(__dirname, '../..'));
const webRootDir = path.join(repoRootDir, 'web');
const srcRootDir = path.join(webRootDir, 'src');
const articlesPath = path.join(srcRootDir, 'data/articles/articles.json');


const getArticlesInfo = () => {
    const articles = JSON.parse(fs.readFileSync(articlesPath));
    for (const article of articles) {
        const repoPath = path.join(srcRootDir, article.path);
        const command = `git log -n 1 --follow --pretty=%aI -- ${repoPath}`;
        let lastModifiedDate = proc.execSync(command, { encoding: 'utf-8' }).trim() || article.date;
        article.lastModified = new Date(lastModifiedDate).toISOString();
    };

    return articles;
}

const getSitemapEntries = () => {
    const articles = getArticlesInfo();

    const getLastModified = (timestamps) => {
        let items = Array.from(timestamps);
        items.sort((a, b) => a.localeCompare(b));
        return items[items.length - 1];
    }

    // Create entries for static pages
    const staticEntries = [
        { loc: '', lastMod: getLastModified(articles.map(a => a.lastModified)) }
    ];

    // Create entries for tag listing pages
    const tagEntries = _(articles)
        .flatMap(a => a.tags.map(t => [t, a.lastModified]))
        .groupBy(e => e[0])
        .mapValues(v => getLastModified(v.map(x => x[1])))
        .toPairs()
        .sort()
        .map(([t, lm]) => ({ loc: `/tags/${t}`, lastMod: lm }))
        .value();

    // Create entries for blog articles
    const articleEntries = articles
        .map(a => ({ loc: `/${a.slug}`, lastMod: a.lastModified }))

    const entries = [...staticEntries, ...tagEntries, ...articleEntries];

    return entries;
}

const formatSitemap = (entries) => {
    let result = '<?xml version="1.0" encoding="UTF-8"?>\n';
    result = result.concat('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n');
    for (const entry of entries) {
        result = result.concat(`\t<url>\n\t\t<loc>${siteRoot}${entry.loc}</loc>\n\t\t<lastmod>${entry.lastMod}</lastmod>\n\t</url>\n`);
    }
    result = result.concat('</urlset>');

    return result;
}

// Generate sitemap
const entries = getSitemapEntries();
const sitemap = formatSitemap(entries);

// Debug logging
const outputPath = 'public/sitemap.xml';
console.log(`Created sitemap with ${entries.length} entries (${outputPath})`);

// Write sitemap.xml
const writePath = path.join(webRootDir, outputPath);
fs.writeFileSync(writePath, sitemap, { encoding: 'utf-8'});
