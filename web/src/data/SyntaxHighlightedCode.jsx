import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { stackoverflowDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';


const SyntaxHighlightedCode = ({ className, startingLineNumber, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');

    // MDX parsing adds a trailing newline, we don't want to render it
    children = children.trimEnd('\n');

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
                {children}
            </SyntaxHighlighter>
        );
    }

    return (
        <code className={className} {...props}>
            {children}
        </code>
    );
}


export default SyntaxHighlightedCode;
