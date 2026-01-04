import React, { useState } from 'react';
import { SavedDesign } from '../types';
import { SparklesIcon, Delete02Icon, Cancel01Icon } from 'hugeicons-react';
import { deleteGeneratedDesign } from '../services/storageService';

interface MyStylesProps {
  designs: SavedDesign[];
  onRefresh: () => void;
  isLoading?: boolean;
}

const MyStyles: React.FC<MyStylesProps> = ({ designs, onRefresh, isLoading = false }) => {
  const [selectedDesign, setSelectedDesign] = useState<SavedDesign | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (designId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDeleting) return;
    
    setIsDeleting(designId);
    const success = await deleteGeneratedDesign(designId);
    if (success) {
      onRefresh();
      if (selectedDesign?.id === designId) {
        setSelectedDesign(null);
      }
    }
    setIsDeleting(null);
  };

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="flex items-center justify-center gap-2 mb-8">
          <SparklesIcon size={20} className="text-[#4A192C]" />
          <h2
            className="text-2xl font-medium"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            My Styles
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-[3/4] rounded-2xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (designs.length === 0) {
    return (
      <div className="py-12">
        <div className="flex items-center justify-center gap-2 mb-8">
          <SparklesIcon size={20} className="text-[#4A192C]" />
          <h2
            className="text-2xl font-medium"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            My Styles
          </h2>
        </div>
        <div className="text-center py-12 bg-white/50 rounded-3xl border border-gray-100">
          <p className="text-gray-400 mb-2">No styles yet</p>
          <p className="text-sm text-gray-400">Your generated designs will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="flex items-center justify-center gap-2 mb-8">
        <SparklesIcon size={20} className="text-[#4A192C]" />
        <h2
          className="text-2xl font-medium"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          My Styles
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {designs.map((design) => (
          <div
            key={design.id}
            onClick={() => setSelectedDesign(design)}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer border border-gray-100 hover:border-[#4A192C]/30 transition-all shadow-md hover:shadow-xl bg-white"
          >
            <img
              src={design.generated_image_url}
              alt={design.prompt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
              <p className="text-[11px] text-white line-clamp-2 leading-tight">
                {design.prompt}
              </p>
            </div>
            <button
              onClick={(e) => handleDelete(design.id, e)}
              disabled={isDeleting === design.id}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 hover:bg-red-500 text-gray-600 hover:text-white opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center shadow-md"
            >
              {isDeleting === design.id ? (
                <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Delete02Icon size={14} />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Modal for selected design */}
      {selectedDesign && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedDesign(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedDesign(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-10"
            >
              <Cancel01Icon size={20} />
            </button>
            <div className="grid md:grid-cols-2">
              <div className="aspect-[3/4] md:aspect-auto">
                <img
                  src={selectedDesign.generated_image_url}
                  alt={selectedDesign.prompt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Prompt
                </p>
                <p
                  className="text-lg text-gray-800 italic mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  "{selectedDesign.prompt}"
                </p>
                <p className="text-xs text-gray-400">
                  Created {new Date(selectedDesign.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyStyles;
