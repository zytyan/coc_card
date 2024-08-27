'use client'
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Paper } from "@mui/material";

function MarkdownReader({ filePath }) {
    const [content, setContent] = useState("");

    useEffect(() => {
        fetch(filePath)
            .then((response) => response.text())
            .then((text) => setContent(text));
    }, [filePath]);

    return (
        <Paper style={{ padding: '16px' }}>
            <ReactMarkdown
                children={content}
                remarkPlugins={[remarkGfm]}
                components={{
                    img: ({ node, ...props }) => (
                        <img
                            style={{ maxWidth: '100%', height: 'auto' }}
                            alt={props.alt || ''}
                            {...props}
                        />
                    ),
                    h1: ({ node, ...props }) => <h1 style={{ fontSize: '2rem', color: '#3f51b5' }} {...props} />,
                    h2: ({ node, ...props }) => <h2 style={{ fontSize: '1.5rem', color: '#3f51b5' }} {...props} />,
                    h3: ({ node, ...props }) => <h3 style={{ fontSize: '1.25rem', color: '#3f51b5' }} {...props} />,
                    p: ({ node, ...props }) => <p style={{ fontSize: '1rem', lineHeight: '1.6' }} {...props} />,
                    li: ({ node, ...props }) => <li style={{ marginBottom: '8px' }} {...props} />,
                }}
            />
        </Paper>
    );
}

export default MarkdownReader;

