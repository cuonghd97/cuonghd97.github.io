import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { ImageUrl } from '../models/image.url';

const storage = getStorage();

class FirebaseStorageService {
    getListFileDownloadURL = async (listFileName: string[]) => {
        let listFireURL: ImageUrl[] = [];
        for (const fileName of listFileName) {
            const fileRef = ref(storage, fileName);
            await getDownloadURL(fileRef).then((url) => {
                listFireURL.push({ fileName: fileName, URL: url });
            });
        }

        return listFireURL;
    };
}

export default new FirebaseStorageService();
