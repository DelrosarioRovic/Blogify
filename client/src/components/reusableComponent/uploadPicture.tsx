import React, { ChangeEvent } from 'react';
import cloudUrlImg from '../../API/cloudPhotoUrl';

interface Props {
  setAddPic:  React.Dispatch<React.SetStateAction<string>>;
}

const ImageUploader: React.FC<Props> = (props) => {
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async() => {
        const base64String = reader.result as string;
         props.setAddPic(await cloudUrlImg(base64String));
      };
      reader.readAsDataURL(file);
    }
  };
  
  
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} className='hidden' id='uploadimage' />
      <label
        htmlFor="uploadimage"
        className="border-[2px] border-gray-800 p-2 cursor-pointer rounded-md"
      >
        Add cover image
      </label>
    </div>
  );
};


export { ImageUploader };
