import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { ImageUrl } from '../models/image.url';

const storage = getStorage();

class FirebaseStorageService {
    getListFileDownloadURL = async (listFileName: string[]) => {
        let listFireURL: ImageUrl[] = [];
        if (listFileName.length === 0) {
            return listFireURL;
        }

        for (const fileName of listFileName) {
            const fileRef = ref(storage, fileName);
            if (fileName !== '') {
                await getDownloadURL(fileRef)
                    .then((url) => {
                        listFireURL.push({ fileName: fileName, URL: url });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }

        return listFireURL;
    };
}

export default new FirebaseStorageService();
