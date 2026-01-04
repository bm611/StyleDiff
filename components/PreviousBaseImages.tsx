import React from 'react';
import { BaseImage } from '../types';
import { ImageUploadIcon } from 'hugeicons-react';

interface PreviousBaseImagesProps {
  images: BaseImage[];
  onSelect: (imageUrl: string) => void;
  isLoading?: boolean;
}

const PreviousBaseImages: React.FC<PreviousBaseImagesProps> = ({
  images,
  onSelect,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="mt-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Previously Used
        </p>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-16 h-20 rounded-lg bg-gray-100 animate-pulse flex-shrink-0"
            />
          ))}
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
        Previously Used
      </p>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => onSelect(image.url)}
            className="w-16 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-[#4A192C] transition-all flex-shrink-0 group relative"
          >
            <img
              src={image.url}
              alt="Previous upload"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <ImageUploadIcon
                size={16}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PreviousBaseImages;
