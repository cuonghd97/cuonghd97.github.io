import * as React from 'react'
import styles from './posts.module.css'
import { PostItem } from '../post-item/PostItem'

type Props = {}
export const Posts = (props: Props) => {
    return (
        <div className={styles.posts}>
            <PostItem className={styles.post1} title={'Post 1'} />
            <PostItem className={styles.post2} title={'Post 2'} />
            <PostItem className={styles.post3} title={'Post 3'} />
            <PostItem className={styles.post4} title={'Post 4'} />
            <PostItem className={styles.post5} title={'Post 5'} />
            <PostItem className={styles.post6} title={'Post 6'} />
            <PostItem className={styles.post7} title={'Post 7'} />
            <PostItem className={styles.post8} title={'Post 8'} />
            <PostItem className={styles.post9} title={'Post 9'} />
        </div>
    )
}
