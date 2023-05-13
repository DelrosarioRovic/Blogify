const cloudUrlImg = async (img: string) => {
    const CLOUDINARY_CLOUD_NAME = 'dydev6c7k';
  
    const formData = new FormData();
    formData.append('file', img);
    formData.append('upload_preset', 'blogify');
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
    })
   
    const jsonResponse = await response.json();
    return jsonResponse.secure_url;
  }

  export default cloudUrlImg;