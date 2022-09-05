const path = require('path');
const fs = require('fs');

const srcDir = path.normalize(path.join(__dirname, '..', 'src'));
const articlesPath = 'data/articles';

const outputFile = 'articles.json'
const outputPath = path.join(articlesPath, outputFile);


const parseMetadata = (mdxPath, metadataStr) => {
    const result = { 'path': mdxPath };

    const lines = metadataStr
        .split('\n')
        .map(s => s.trim());

    // Parse each line as a 'key: value' pair
    for (const line of lines) {
        const match = line.match(/^\s*(.*?)\s*:\s*(.*?)\s*$/);
        if (!match) {
            throw `Post ${mdxPath} has malformed metadata. Expected 'key: value', got '${line}'.`;
        }
        const [key, value] = [match[1], match[2]];

        result[key] = value;
    };

    // Ensure we have all the required fields
    const required = ['title', 'date', 'tags'];
    for (const r of required) {
        if (!(r in result)) {
            throw `Post ${mdxPath} is missing the '${r}' metadata.`;
        }
    }

    // Tags are comma separated, so let's turn that into an array
    result['tags'] = result['tags']
        .split(',')
        .map(t => t.trim().toLowerCase());

    // Generate a slug if one doesn't exist yet
    if (!('slug' in result)) {
        result['slug'] = result['title']
            .toLowerCase()
            .replaceAll(' ', '-')
            .replaceAll(/[^a-z0-9-]/g, '');
    }

    return result;
}


const processFile = (mdxPath) => {
    const readPath = path.join(srcDir, mdxPath);
    const mdx = fs.readFileSync(readPath, { encoding: 'utf-8' });
    const match = mdx.match(/{\/\*\s*(.*?)\s*\*\/}/s);
    if (!match) {
        throw 'Unable to find the metadata comment in the MDX';
    }

    const metadataStr = match[1];
    const metadata = parseMetadata(mdxPath, metadataStr);

    return metadata;
}

// Get all the MDX files, and get paths relative to the `src` dir
const scanDir = path.join(srcDir, articlesPath);
const mdxFiles = fs.readdirSync(scanDir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => path.join(articlesPath, f));

// Extract metadata from each MDX file
const results = mdxFiles.map(processFile);

// Save as JSON file
const writePath = path.join(srcDir, outputPath);
console.log(`Preprocessed ${results.length} blog posts (src/${outputPath})`);
fs.writeFileSync(writePath, JSON.stringify(results, null, 2), { encoding: 'utf-8'});
