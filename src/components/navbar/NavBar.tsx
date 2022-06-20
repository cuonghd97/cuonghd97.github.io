import * as React from 'react';
import styles from './navbar.module.scss';
import { Menu } from '../menu/Menu';

export const NavBar = () => {
    return (
        <div className={styles.navbarContainer}>
            <div className={styles.imageContainer}>
                <img alt="" src="https://picsum.photos/300/300" />
            </div>
            <div className={styles.infoContainer}>
                <span className={styles.name}>Cuong's</span>
                <span className={styles.name}>Blog</span>
                <span className={styles.title}>Backend developer</span>
            </div>
            <Menu />
        </div>
    );
};
