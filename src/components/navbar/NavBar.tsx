import * as React from 'react';
import styles from "./navbar.module.css";
import pacman from "../../assets/imgs/pacman.gif"

export const NavBar = () => {
    return (
        <div className={styles.navbar}>
            <span className={styles.header}>Empty Blog</span>
            <img src={pacman} alt="pacman" className={styles.pacman}/>
        </div>
    );
};
