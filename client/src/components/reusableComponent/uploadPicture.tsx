import React, { ChangeEvent } from 'react';

interface Props {
  onImageUpload: (base64String: string) => void;
}

const ImageUploader: React.FC<Props> = ({ onImageUpload }) => {
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        onImageUpload(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} className='hidden' id='uploadimage' />
    </div>
  );
};

export { ImageUploader };
