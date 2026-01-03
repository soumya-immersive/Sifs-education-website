"use client";

import { Search, FileCheck, Edit, Save, Loader2 } from "lucide-react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useAdmissionPageData } from "../../../hooks/useAdmissionPageData";
import EditableText from "../../../components/editable/EditableText";

export default function UploadDocumentsPage() {
  const {
    data,
    updateSection,
    editMode,
    setEditMode,
    saveData,
    isLoaded
  } = useAdmissionPageData();

  const [regNumber, setRegNumber] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  const uploadData = data.uploadDocuments;

  const handleEditClick = () => {
    setIsEditLoading(true);
    setEditMode(true);
    setIsEditLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const success = await saveData();
    setTimeout(() => {
      if (success) {
        setEditMode(false);
        toast.success("✅ Upload Documents page updated successfully");
      } else {
        toast.error("❌ Failed to save changes");
      }
      setIsSaving(false);
    }, 800);
  };

  const updateUploadData = (updatedInfo: any) => {
    updateSection("uploadDocuments", { ...uploadData, ...updatedInfo });
  };

  return (
    <section className="relative bg-white pt-16 pb-24 px-4 overflow-hidden">
      <Toaster position="top-right" />

      {/* Admin Controls */}
      <div className="fixed bottom-6 right-6 z-[1000] flex gap-2">
        {!editMode ? (
          <button
            onClick={handleEditClick}
            disabled={isEditLoading}
            className={`flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all font-medium ${isEditLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isEditLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Edit size={18} />
            )}
            {isEditLoading ? 'Loading...' : 'Edit Page'}
          </button>
        ) : (
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all font-medium animate-in fade-in zoom-in ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSaving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-72 h-72 bg-indigo-50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10 text-center mb-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#0056B3] px-4 py-2 rounded-full mb-6">
          <FileCheck className="w-4 h-4" />
          <span className="text-sm font-semibold uppercase tracking-wider">
            <EditableText
              html={uploadData.badge.text}
              editMode={editMode}
              onChange={(val) => updateUploadData({ badge: { ...uploadData.badge, text: val } })}
              className="inline"
            />
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
          <EditableText
            html={uploadData.title}
            editMode={editMode}
            onChange={(val) => updateUploadData({ title: val })}
            className="inline"
          />
          {" "}
          <span className="text-[#0056B3]">
            <EditableText
              html={uploadData.highlightedTitle}
              editMode={editMode}
              onChange={(val) => updateUploadData({ highlightedTitle: val })}
              className="inline"
            />
          </span>
        </h1>

        {/* Description */}
        <div className="max-w-2xl mx-auto text-gray-600 text-lg md:text-xl mb-10 leading-relaxed">
          <EditableText
            html={uploadData.description}
            editMode={editMode}
            onChange={(val) => updateUploadData({ description: val })}
          />
        </div>

        {/* Registration Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-3 bg-white p-2 rounded-2xl md:rounded-full shadow-2xl border border-gray-100">
            <div className="flex-1 relative flex items-center">
              <Search className="absolute left-5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={editMode ? "Edit placeholder text..." : uploadData.placeholder}
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-full border-none focus:ring-0 outline-none text-gray-700 text-lg placeholder:text-gray-300"
              />
              {editMode && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <input
                    type="text"
                    value={uploadData.placeholder}
                    onChange={(e) => updateUploadData({ placeholder: e.target.value })}
                    className="text-sm px-3 py-1 border border-blue-300 rounded bg-blue-50 text-blue-900"
                    placeholder="Placeholder text"
                  />
                </div>
              )}
            </div>
            <button className="bg-[#0056B3] hover:bg-[#004494] text-white px-10 py-4 rounded-xl md:rounded-full font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 shrink-0">
              {editMode ? (
                <input
                  type="text"
                  value={uploadData.buttonText}
                  onChange={(e) => updateUploadData({ buttonText: e.target.value })}
                  className="bg-transparent border-b border-white/50 outline-none text-center min-w-[150px]"
                />
              ) : (
                uploadData.buttonText
              )}
            </button>
          </div>

          {/* Quick Help */}
          <p className="mt-4 text-sm text-gray-400">
            <EditableText
              html={uploadData.helpText}
              editMode={editMode}
              onChange={(val) => updateUploadData({ helpText: val })}
              className="inline"
            />
            {" "}
            <span className="text-[#0056B3] font-semibold underline underline-offset-4 cursor-pointer">
              <EditableText
                html={uploadData.supportLinkText}
                editMode={editMode}
                onChange={(val) => updateUploadData({ supportLinkText: val })}
                className="inline"
              />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}