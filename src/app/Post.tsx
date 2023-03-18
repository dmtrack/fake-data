import React from 'react';

const Post = (props: {
    title:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined;
    body:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined;
}) => {
    return (
        <div className='post'>
            <h1>{props.title}</h1>
            <p>{props.body}</p>
        </div>
    );
};

export default Post;
