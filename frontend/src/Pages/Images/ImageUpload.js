import React from "react";
import { Input } from "@chakra-ui/react";

const ImageUpload = ({ onImageSelect }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect({
          data: reader.result.split(",")[1],
          mimeType: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return <Input type="file" accept="image/*" onChange={handleFileChange} />;
};

export default ImageUpload;
