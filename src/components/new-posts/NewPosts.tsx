import * as React from 'react';
import styles from './new-posts.module.scss';
import PostsDataService from '../../services/posts.service';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PostModel } from '../../models/post';
import TimeUtils from '../../utils/time.utils';

export const NewPosts = () => {
    useEffect(() => {
        getListPosts().catch((error) => {
            console.log(error);
        });

        return () => {};
    }, []);

    const [listPost, setListPost] = useState<PostModel[]>([]);

    const getListPosts = async () => {
        const listPostResponse = await PostsDataService.getListPosts();

        let listPostModel: PostModel[] = [];

        listPostResponse.forEach((doc) => {
            listPostModel.push({
                id: doc.id,
                title: doc.data()['title'],
                tag: doc.data()['tag'],
                createdAt: TimeUtils.timestampToDate(
                    doc.data()['created_at']['seconds']
                ),
            });
        });

        setListPost(listPostModel);
    };

    return (
        <div className={styles.posts}>
            {listPost.map((post) => {
                return (
                    <Link
                        to={`post/${post.id}`}
                        className={styles.link}
                        key={post.id}
                    >
                        <div className={styles.postItem}>
                            <span className={styles.tag}>{post.tag}</span>
                            <span className={styles.dateAdded}>
                                {post.createdAt}
                            </span>
                            <span className={styles.title}>{post.title}</span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};
