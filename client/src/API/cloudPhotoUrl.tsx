import { useState } from "react";

const cloudApi = () => {
    const [uploadingPromise, setUploadingPromise] = useState<boolean>(false);
    
    const cloudUrlImg = async (img: string) => {
        setUploadingPromise(true);
        const CLOUDINARY_CLOUD_NAME = 'dydev6c7k';
        const formData = new FormData();
        formData.append('file', img);
        formData.append('upload_preset', 'blogify');
        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData,
        })
        const jsonResponse = await response.json();
        const jsonFnalRes = jsonResponse.secure_url;
        return jsonFnalRes
        } catch (error) {
            console.log(error);
        } finally {
            setUploadingPromise(false);
        }
      }
      return {cloudUrlImg, uploadingPromise}
}


  export default cloudApi;