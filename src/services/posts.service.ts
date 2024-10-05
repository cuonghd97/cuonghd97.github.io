import { collection, getDocs, doc, getDoc, orderBy, query } from 'firebase/firestore';
import { firestore } from '../libs/firebase/firebase';

const collectionPost = 'posts';
const postsCollection = collection(firestore, collectionPost);

class PostsDataService {
    getListPosts = () => {
        return getDocs(query( postsCollection, orderBy("created_at", "desc")));
    };

    getPostByID = (postID: string) => {
        const docRef = doc(firestore, collectionPost, postID);
        return getDoc(docRef);
    };
}

export default new PostsDataService();
