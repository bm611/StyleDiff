import React from 'react';
import { BaseImage } from '../types';
import { ArrowRight01Icon } from 'hugeicons-react';

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
        <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (images.length === 0) {
    return null;
  }

  // Only use the most recent image
  const lastImage = images[0];

  return (
    <div className="mt-6">
      <button
        onClick={() => onSelect(lastImage.url)}
        className="w-full flex items-center gap-4 p-3 rounded-xl border border-gray-200 hover:border-[#4A192C] hover:bg-gray-50 transition-all group"
      >
        <div className="w-12 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={lastImage.url}
            alt="Last used"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-gray-700">Use last image</p>
          <p className="text-xs text-gray-400">Continue with your previous photo</p>
        </div>
        <ArrowRight01Icon
          size={18}
          className="text-gray-400 group-hover:text-[#4A192C] transition-colors"
        />
      </button>
    </div>
  );
};

export default PreviousBaseImages;
