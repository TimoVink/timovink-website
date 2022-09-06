import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { stackoverflowDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';


const SyntaxHighlightedCode = ({ className, startingLineNumber, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    if (match) {
        return (
            <SyntaxHighlighter
                language={match[1]}
                style={stackoverflowDark}
                PreTag={React.Fragment}
                startingLineNumber={startingLineNumber}
                lineNumberStyle={{ 'opacity': 0.3 }}
                showLineNumbers
                {...props}
            >
                {children.trim()}
            </SyntaxHighlighter>
        );
    }

    return (
        <code className={className} {...props}>
            {children.trim()}
        </code>
    );
}


export default SyntaxHighlightedCode;
