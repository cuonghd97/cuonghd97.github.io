import * as React from 'react'
import styles from './new-posts.module.scss'

export const NewPosts = () => {
    return (
        <div className={styles.posts}>
            <div className={styles.postItem}>
                <span className={styles.tag}>CSS</span>
                <span className={styles.dateAdded}>August, 18</span>
                <span className={styles.title}>Animated Link Underline</span>
            </div>
            <div className={styles.postItem}>
                <span className={styles.tag}>CSS</span>
                <span className={styles.dateAdded}>August, 18</span>
                <span className={styles.title}>Animated Link Underline</span>
            </div>
            <div className={styles.postItem}>
                <span className={styles.tag}>CSS</span>
                <span className={styles.dateAdded}>August, 18</span>
                <span className={styles.title}>Animated Link Underline</span>
            </div>
            <div className={styles.postItem}>
                <span className={styles.tag}>CSS</span>
                <span className={styles.dateAdded}>August, 18</span>
                <span className={styles.title}>Animated Link Underline</span>
            </div>
            <div className={styles.postItem}>
                <span className={styles.tag}>CSS</span>
                <span className={styles.dateAdded}>August, 18</span>
                <span className={styles.title}>Animated Link Underline</span>
            </div>
        </div>
    )
}