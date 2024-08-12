  import React, { useState, useCallback } from 'react';
  import Cropper from 'react-easy-crop';
  import { getCroppedImg } from '../utils/cropImage';

  const CropComponent = ({ imageSrc, onCancel, onCropComplete }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropChange = (crop) => {
      setCrop(crop);
    };

    const onZoomChange = (zoom) => {
      setZoom(zoom);
    };

    const onCropCompleteHandler = useCallback((croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleCrop = async () => {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(croppedImage);
    };

    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="relative w-96 h-96">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={4 / 1}
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
              onCropComplete={onCropCompleteHandler}
            />
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={onCancel}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleCrop}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Crop
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default CropComponent;
