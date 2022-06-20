import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../libs/firebase/firebase';

const postsCollection = collection(firestore, 'posts');

class PostsDataService {
    getListPosts = () => {
        return getDocs(postsCollection);
    };
}

export default new PostsDataService();
