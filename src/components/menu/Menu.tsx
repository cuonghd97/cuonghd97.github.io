import * as React from 'react';
import styles from './menu.module.scss';
import { Link } from "react-router-dom";

export const Menu = () => {
    return (
        <div className={styles.menu}>
            <ul>
                <li className={styles.active}>All post</li>
                <li>Service Architecture</li>
                <li>Design Pattern</li>
                <li>OOP</li>
                <li>About me</li>
                <li><Link to="/secret-gallery">See more</Link></li>
            </ul>
        </div>
    );
};
