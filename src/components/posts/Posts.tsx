import * as React from 'react';
import styles from './posts.module.css';
import { PostItem } from '../post-item/PostItem';
import PostsDataService from '../../services/posts.service';
import { useEffect, useState } from 'react';
import { PostModel } from '../../models/post';

type Props = {};
export const Posts = (props: Props) => {
    useEffect(() => {
        getListsPost().catch((error) => {
            console.log(error);
        });

        return () => {};
    }, []);

    const [listPost, setListPost] = useState<PostModel[]>([]);

    const getListsPost = async () => {
        const listPostsResponse = await PostsDataService.getListPosts();
        let listPostsModel: PostModel[] = [];
        listPostsResponse.forEach((doc) => {
            listPostsModel.push({
                id: doc.id,
                title: doc.data()['title'],
                tag: doc.data()['tag'],
                createdAt: doc.data()['created_at']['seconds'],
            });
        });

        setListPost(listPostsModel);
    };
    return (
        <ul className={styles.posts}>
            {listPost.map((post) => {
                return (
                    <li key={post.id} className={styles.postItem}>
                        <PostItem
                            className="post"
                            title={post.title!}
                            key={post.id}
                        />
                    </li>
                );
            })}
        </ul>
    );
};
