import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { ImageUrl } from '../models/image.url';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;

const storage = getStorage();

class FirebaseStorageService {
    getListFileDownloadURL = async (listFileName: string[]) => {
        let listFireURL: ImageUrl[] = [];
        for (const fileName of listFileName) {
            const fileRef = ref(storage, fileName);
            await getDownloadURL(fileRef)
                .then((url) => {
                    listFireURL.push({ fileName: fileName, URL: url });
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        return listFireURL;
    };
}

export default new FirebaseStorageService();
