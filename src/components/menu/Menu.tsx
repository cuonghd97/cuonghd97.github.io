import * as React from 'react';
import styles from './menu.module.scss';

export const Menu = () => {
    return (
        <div className={styles.menu}>
            <ul>
                <li className={styles.active}>All post</li>
                <li>Service Architecture</li>
                <li>Design Pattern</li>
                <li>OOP</li>
                <li>About me</li>
                <li>See more</li>
            </ul>
        </div>
    );
};
