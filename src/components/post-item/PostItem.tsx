import * as React from 'react'
import styles from "./post-item.module.css"

type Props = {
    className: string
    title: string
}
export const PostItem = (props: Props) => {
    return (
        <div className={[props.className, styles.postItem].join(" ")}>
            <p>Date - Language</p>
            <p>{props.title}</p>
        </div>
    )
}
