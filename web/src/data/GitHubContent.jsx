import PropTypes from 'prop-types';
import { useApiCall } from 'queryClient';

import SyntaxHighlightedCode from './SyntaxHighlightedCode';


const GitHubContent = ({ repo, commit, branch, file, language, lines }) => {
    const url = `https://raw.githubusercontent.com/${repo}/${commit}/${file}`;
    const { isLoading, data } = useApiCall(url);

    if (isLoading) {
        return <pre>Loading...</pre>;
    }

    const lang = language || file.split('.').at(-1);
    const langClass = `language-${lang}`;

    let code = data;
    if (lines && code) {
        const [linesStart, linesEnd] = lines.split('-');
        code = code
            .split('\n')
            .slice(linesStart - 1, linesEnd)
            .join('\n');
    }

    return (
        <pre>
            <SyntaxHighlightedCode className={langClass}>
                {code}
            </SyntaxHighlightedCode>
        </pre>
    );
};

GitHubContent.propTypes = {
    repo: PropTypes.string,
    commit: PropTypes.string,
    file: PropTypes.string.isRequired,
    language: PropTypes.string,
    lines: PropTypes.string,
};

GitHubContent.defaultProps = {
    repo: 'TimoVink/tv-personalsite',
    commit: 'main',
};


export default GitHubContent;
