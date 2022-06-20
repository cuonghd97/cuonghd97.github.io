import * as React from 'react';
import { NavBar } from '../../components/navbar/NavBar';
import { Posts } from '../../components/posts/Posts';
import { NewPosts } from '../../components/new-posts/NewPosts';
import styles from './home-page.module.scss';

export const HomePage = () => {
    return (
        <div className={styles.home}>
            <NavBar />
            <NewPosts />
        </div>
    );
};
