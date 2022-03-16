import * as React from "react";
import styles from "./navbar.module.css";
import pacman from "../../assets/imgs/pacman.gif";

export const NavBar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.headerContainer }>
                <span className={styles.headerText}>Empty Blog</span>
                <img src={pacman} alt="pacman" className={styles.pacman} />
            </div>
            <div>
                <ul>
                    <li>Home</li>
                    <li>Java</li>
                    <li>Deign pattern</li>
                    <li>About me</li>
                </ul>
            </div>
        </div>
    );
};
