import React from 'react';

const DocumentContent = ({ content }) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default DocumentContent;