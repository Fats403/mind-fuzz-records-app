import { useCallback, useContext, useState } from "react";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { storage } from "../../services/firebase/client";
import { SnackBarContext } from "../../contexts/SnackBarProvider";
import { v4 as uuidv4 } from "uuid";

export default function useImageUpload(folder = "") {
  const { showMessage } = useContext(SnackBarContext);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (dataURL) => {
    const imageUuid = uuidv4();
    const fileType = dataURL.split(";")[0].split("/")[1];
    const storageRef = ref(storage, `${folder}/${imageUuid}.${fileType}`);

    return new Promise((resolve, reject) => {
      uploadString(storageRef, dataURL, "data_url")
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  const handleInputChange = useCallback(
    ({ target }) => {
      if (!target) return;

      setIsLoading(true);

      const fileReader = new FileReader();
      fileReader.readAsDataURL(target.files[0]);

      fileReader.onload = async (e) => {
        let imageURL;
        try {
          imageURL = await uploadImage(e.target.result);
          setImagePreview(imageURL);
        } catch (e) {
          showMessage({
            message: e.message,
            severity: "error",
          });
        }

        setIsLoading(false);
      };

      fileReader.onerror = (e) => {
        setIsLoading(false);
        showMessage({
          message: e.message,
          severity: "error",
        });
      };
    },
    [setImagePreview, setIsLoading]
  );

  return {
    isLoading,
    handleInputChange,
    imagePreview,
  };
}
