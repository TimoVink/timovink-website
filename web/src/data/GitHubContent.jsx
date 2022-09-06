import PropTypes from 'prop-types';
import { useApiCall } from 'queryClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import SyntaxHighlightedCode from './SyntaxHighlightedCode';




const GitHubContent = ({ repo, commit, file, language, lines }) => {
    const url = `https://raw.githubusercontent.com/${repo}/${commit}/${file}`;
    const { isLoading, data } = useApiCall(url);

    const repoUrl = `https://github.com/${repo}/tree/${commit}`;
    let fileUrl = `https://github.com/${repo}/blob/${commit}/${file}`;

    if (isLoading) {
        return <pre>Loading...</pre>;
    }

    let langClass = null;
    if (language !== false) {
        const lang = language || file.split('.').at(-1);
        langClass = `language-${lang}`;
    }

    let code = data;
    let [linesStart, linesEnd] = [1, null];
    if (lines) {
        [linesStart, linesEnd] = lines.split('-').map(x => parseInt(x));
        code = code
            .split('\n')
            .slice(linesStart - 1, linesEnd)
            .join('\n');

        fileUrl += `#L${linesStart}-L${linesEnd}`;
    }

    return (
        <div>
            <div className="flex items-center rounded-t-md px-4 py-2 bg-slate-900 space-x-2">
                <a href={repoUrl} target="_blank" className="text-slate-200">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href={fileUrl} target="_blank" className="font-mono text-slate-200">
                    {lines ? `${file}:${lines}` : file}
                </a>
            </div>
            <pre className="rounded-t-none mt-0">
                <SyntaxHighlightedCode className={langClass} startingLineNumber={linesStart}>
                    {code}
                </SyntaxHighlightedCode>
            </pre>
        </div>
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
