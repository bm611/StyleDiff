
import React, { useRef, useState } from 'react';

interface DropzoneProps {
  onImageSelected: (base64: string) => void;
  label: string;
  icon: string;
  previewUrl: string | null;
  aspectRatio?: string;
}

const Dropzone: React.FC<DropzoneProps> = ({ onImageSelected, label, icon, previewUrl, aspectRatio = "aspect-[3/4]" }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageSelected(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div 
      className={`relative rounded-2xl border-2 border-dashed transition-all cursor-pointer group overflow-hidden ${aspectRatio} ${
        isDragging ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 hover:border-white/20 bg-white/5'
      }`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      {previewUrl ? (
        <div className="absolute inset-0 group">
          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <p className="text-sm font-medium text-white bg-black/50 px-4 py-2 rounded-full">Change Image</p>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <i className={`fa-solid ${icon} text-gray-400 group-hover:text-indigo-400`}></i>
          </div>
          <p className="text-sm font-semibold text-gray-300 mb-1">{label}</p>
          <p className="text-xs text-gray-500">Drag & drop or click to upload</p>
        </div>
      )}
      <input 
        type="file" 
        className="hidden" 
        accept="image/*" 
        ref={fileInputRef}
        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
      />
    </div>
  );
};

export default Dropzone;
