import * as React from 'react';
import styles from './post-content.module.scss';
import { useParams } from 'react-router-dom';
import PostsDataService from '../../services/posts.service';
import { useEffect, useState } from 'react';
import { PostModel } from '../../models/post';
import { Buffer } from 'buffer';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

type PostParam = {
    postID?: string;
};

export const PostContent = () => {
    const [post, setPost] = useState<PostModel>({
        contents: '',
        id: '',
        tag: '',
        createdAt: '',
        title: '',
    });
    const { postID } = useParams<PostParam>();

    useEffect(() => {
        getPostContent(postID).catch((error) => {
            console.log(error);
        });
    }, []);

    const getPostContent = async (postID: string | undefined) => {
        if (postID) {
            const postResponse = await PostsDataService.getPostByID(postID);
            const contentBase64 = postResponse.data()!['contents'];
            const content = Buffer.from(contentBase64, 'base64').toString(
                'utf8'
            );

            const postModel: PostModel = {
                contents: content,
                createdAt: '',
                id: postResponse.id,
                tag: postResponse.data()!['tag'],
                title: postResponse.data()!['title'],
            };

            setPost(postModel);
            return;
        }

        throw 'Post not found';
    };

    return (
        <div className={styles.pageContent}>
            <div></div>
            <div className={styles.mainContent}>
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {post!.contents!}
                </ReactMarkdown>
            </div>
            <div></div>
        </div>
    );
};
