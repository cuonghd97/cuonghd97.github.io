import * as React from 'react'
import styles from './new-posts.module.scss'
import { Link } from 'react-router-dom'

export const NewPosts = () => {
    return (
        <div className={styles.posts}>
            <Link to={'post/id'} className={styles.link}>
                <div className={styles.postItem}>
                    <span className={styles.tag}>CSS</span>
                    <span className={styles.dateAdded}>August, 18</span>
                    <span className={styles.title}>Animated Link Underline</span>
                </div>
            </Link>
            <Link to={'post/id'} className={styles.link}>
                <div className={styles.postItem}>
                    <span className={styles.tag}>CSS</span>
                    <span className={styles.dateAdded}>August, 18</span>
                    <span className={styles.title}>Animated Link Underline</span>
                </div>
            </Link>
            <Link to={'post/id'} className={styles.link}>
                <div className={styles.postItem}>
                    <span className={styles.tag}>CSS</span>
                    <span className={styles.dateAdded}>August, 18</span>
                    <span className={styles.title}>Animated Link Underline</span>
                </div>
            </Link>
            <Link to={'post/id'} className={styles.link}>
                <div className={styles.postItem}>
                    <span className={styles.tag}>CSS</span>
                    <span className={styles.dateAdded}>August, 18</span>
                    <span className={styles.title}>Animated Link Underline</span>
                </div>
            </Link>
            <Link to={'post/id'} className={styles.link}>
                <div className={styles.postItem}>
                    <span className={styles.tag}>CSS</span>
                    <span className={styles.dateAdded}>August, 18</span>
                    <span className={styles.title}>Animated Link Underline</span>
                </div>
            </Link>
        </div>
    )
}
