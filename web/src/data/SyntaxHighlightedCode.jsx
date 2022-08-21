import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { stackoverflowDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';


const SyntaxHighlightedCode = ({ className, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    if (match) {
        return (
            <SyntaxHighlighter
                language={match[1]}
                style={stackoverflowDark}
                PreTag={React.Fragment} {...props}
            />
        );
    }

    return <code className={className} {...props} />;
}


export default SyntaxHighlightedCode;
