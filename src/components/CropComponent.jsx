import React, { useState } from 'react';
import { Cropper } from 'react-easy-crop';

const CropComponent = ({ imageSrc, onCropComplete, aspectRatio }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleCropChange = (crop) => {
    setCrop(crop);
  };

  const handleZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const handleCropCompleted = async () => {
    const croppedImage = await getCroppedImg(imageSrc, crop);
    onCropComplete(croppedImage);
  };

  return (
    <div className="crop-container">
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={aspectRatio}
        onCropChange={handleCropChange}
        onZoomChange={handleZoomChange}
        cropSize={{ width: 300, height: 200 }} // Adjust crop area size
        restrictPosition={false}
      />
      <button onClick={handleCropCompleted}>Apply Crop</button>
    </div>
  );
};

export default CropComponent;
