import * as React from 'react'
import styles from './menu.module.scss'

export const Menu = () => {
    return (
        <div className={styles.menu}>
            <ul>
                <li className={styles.active}>All post</li>
                <li>Design Pattern</li>
                <li>Java</li>
                <li>Python</li>
                <li>Golang</li>
            </ul>
        </div>
    )
}