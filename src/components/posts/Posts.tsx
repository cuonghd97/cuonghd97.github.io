import * as React from 'react'
import styles from './posts.module.css'
import { PostItem } from '../post-item/PostItem'
import PostsDataService from '../../services/posts.service'
import { useEffect, useState } from 'react'
import { PostModel } from '../../models/post'

type Props = {}
export const Posts = (props: Props) => {
    useEffect(() => {
        getListsPost().catch((error) => {
            console.log(error)
        })

        return () => {}
    }, [])

    const [listPost, setListPost] = useState<PostModel[]>([])

    const getListsPost = async () => {
        const listPosts = await PostsDataService.getListPosts()
        let listPostsModel: PostModel[] = []
        listPosts.forEach((doc) => {
            listPostsModel.push({
                content: doc.data()['contents'],
                title: doc.data()['title'],
            })
        })

        setListPost(listPostsModel)
    }
    return (
        <div className={styles.posts}>
            {listPost.map((post, index) => {
                return (
                    <PostItem className="post" title={post.title} key={index} />
                )
            })}

            {/*<PostItem className={styles.post1} title={'Post 1'} />*/}
            {/*<PostItem className={styles.post2} title={'Post 2'} />*/}
            {/*<PostItem className={styles.post3} title={'Post 3'} />*/}
            {/*<PostItem className={styles.post4} title={'Post 4'} />*/}
            {/*<PostItem className={styles.post5} title={'Post 5'} />*/}
            {/*<PostItem className={styles.post6} title={'Post 6'} />*/}
            {/*<PostItem className={styles.post7} title={'Post 7'} />*/}
            {/*<PostItem className={styles.post8} title={'Post 8'} />*/}
            {/*<PostItem className={styles.post9} title={'Post 9'} />*/}
        </div>
    )
}
