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
        const listPostsResponse = await PostsDataService.getListPosts()
        let listPostsModel: PostModel[] = []
        listPostsResponse.forEach((doc) => {
            listPostsModel.push({
                id: doc.id,
                content: doc.data()['contents'],
                title: doc.data()['title'],
                createdAt: doc.data()["created_at"]["seconds"]
            })
        })

        setListPost(listPostsModel)
    }
    return (
        <div className={styles.posts}>
            <ul>
                {listPost.map((post) => {
                    return (
                        <li key={post.id}>
                            <PostItem className="post" title={post.title} key={post.id} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
