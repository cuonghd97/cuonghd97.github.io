import * as React from 'react'
import styles from './post-content.module.scss'

export const PostContent = () => {
    return (
        <div className={styles.pageContent}>
            <div>
                content left
            </div>
            <div>
                main content
            </div>
            <div>right content</div>
        </div>
    )
}
