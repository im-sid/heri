import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

export const uploadImage = async (
  file: File,
  userId: string,
  folder: string = 'artifacts'
): Promise<string> => {
  try {
    const timestamp = Date.now();
    const fileName = `${folder}/${userId}/${timestamp}_${file.name}`;
    const storageRef = ref(storage, fileName);

    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    console.warn('Could not upload to Firebase Storage:', error);
    // Fallback: create local data URL
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }
};

export const deleteImage = async (imagePath: string): Promise<void> => {
  const imageRef = ref(storage, imagePath);
  await deleteObject(imageRef);
};


