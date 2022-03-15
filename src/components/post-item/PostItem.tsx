import * as React from 'react';

type Props = {
    className: string,
    title: string
};
export const PostItem = (props: Props) => {
    return (
        <div className={props.className}>
            <div>Date - Language</div>
            <div>{props.title}</div>
        </div>
    );
};
