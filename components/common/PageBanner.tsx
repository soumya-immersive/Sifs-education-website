"use client";
import React from "react";
import EditableText from "../editable/EditableText";
import { Edit } from "lucide-react";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  bgImage: string;
  editMode?: boolean;
  onUpdate?: (data: { title: string; subtitle: string; bgImage: string }) => void;
}

const PageBanner: React.FC<PageBannerProps> = ({ title, subtitle, bgImage, editMode = false, onUpdate }) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate?.({ title, subtitle: subtitle || "", bgImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="bg-cover bg-center bg-no-repeat py-20 text-center text-white relative transition-all"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-20" />

<<<<<<< HEAD
      {editMode && (
        <div className="absolute top-4 right-4 z-50">
          <label className="cursor-pointer bg-white text-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-50 transition-colors flex items-center justify-center border border-blue-100">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <Edit size={20} />
          </label>
=======
      {subtitle && (
        <div className="mt-2 text-sm md:text-base opacity-90">
          {typeof subtitle === 'string' ? (
            <span dangerouslySetInnerHTML={{ __html: subtitle }} />
          ) : (
            subtitle
          )}
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
          <EditableText
            html={title}
            editMode={editMode}
            onChange={(h) => onUpdate?.({ title: h, subtitle: subtitle || "", bgImage })}
            className="text-white"
          />
        </h1>

        {subtitle !== undefined && (
          <div className="mt-2 text-sm md:text-lg opacity-90 max-w-2xl mx-auto">
            <EditableText
              html={subtitle}
              editMode={editMode}
              onChange={(h) => onUpdate?.({ title, subtitle: h, bgImage })}
              className="text-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PageBanner;

