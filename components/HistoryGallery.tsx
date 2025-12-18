
import React from 'react';
import { GenerationRecord } from '../types';

interface HistoryGalleryProps {
  history: GenerationRecord[];
  onSelect: (item: GenerationRecord) => void;
}

const HistoryGallery: React.FC<HistoryGalleryProps> = ({ history, onSelect }) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <i className="fa-solid fa-clock-rotate-left text-indigo-400"></i>
        Recent Creations
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {history.map((item) => (
          <div 
            key={item.id}
            className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-indigo-500/50 transition-all"
            onClick={() => onSelect(item)}
          >
            <img src={item.resultUrl} alt={item.prompt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
              <p className="text-[10px] text-white line-clamp-2 leading-tight">{item.prompt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryGallery;
