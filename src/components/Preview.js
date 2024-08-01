import React from 'react';

const Preview = ({ content }) => {
    return (
        <div>
            <h2>Preview</h2>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export default Preview;