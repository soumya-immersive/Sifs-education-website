"use client";

import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Edit, Save, Loader2, Plus, Trash2, MoveUp, MoveDown } from "lucide-react";
import { useAdmissionPageData } from "../../../hooks/useAdmissionPageData";
import EditableImage from "../../../components/editable/EditableImage";
import EditableText from "../../../components/editable/EditableText";
import { TermsSection } from "../../../types/admission-page";
import ConfirmationDialog from "../../../components/common/ConfirmationDialog";

export default function TermsAndConditionsPage() {
  const {
    data,
    updateSection,
    editMode,
    setEditMode,
    saveData,
    isLoaded
  } = useAdmissionPageData();

  const [isSaving, setIsSaving] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  const termsData = data.termsAndConditions;

  const handleEditClick = () => {
    setIsEditLoading(true);
    setEditMode(true);
    setIsEditLoading(false);
  };

  const handleSaveClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmSave = async () => {
    setIsSaving(true);
    const success = await saveData();
    setTimeout(() => {
      if (success) {
        setEditMode(false);
        toast.success("✅ Terms & Conditions updated successfully");
      } else {
        toast.error("❌ Failed to save changes");
      }
      setIsSaving(false);
      setShowConfirmation(false);
    }, 800);
  };

  const updateTermsData = (updatedInfo: any) => {
    updateSection("termsAndConditions", { ...termsData, ...updatedInfo });
  };

  const addSection = () => {
    const newSection: TermsSection = {
      id: `section-${Date.now()}`,
      title: "New Section Title",
      content: "New section content goes here...",
      type: "text"
    };
    updateTermsData({ sections: [...termsData.sections, newSection] });
    toast.success("✨ New section added");
  };

  const removeSection = (id: string) => {
    if (confirm("Are you sure you want to remove this section?")) {
      updateTermsData({ sections: termsData.sections.filter(s => s.id !== id) });
      toast.success("🗑️ Section removed");
    }
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...termsData.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    updateTermsData({ sections: newSections });
  };

  const updateSectionContent = (id: string, updates: Partial<TermsSection>) => {
    updateTermsData({
      sections: termsData.sections.map(s => s.id === id ? { ...s, ...updates } : s)
    });
  };

  const toggleSectionType = (id: string) => {
    const section = termsData.sections.find(s => s.id === id);
    if (!section) return;

    const newType = section.type === 'text' ? 'list' : section.type === 'list' ? 'highlight' : 'text';
    updateSectionContent(id, { type: newType });
  };

  const addListItem = (id: string) => {
    const section = termsData.sections.find(s => s.id === id);
    if (!section) return;

    const newListItems = [...(section.listItems || []), "New list item"];
    updateSectionContent(id, { listItems: newListItems });
  };

  const updateListItem = (sectionId: string, itemIndex: number, value: string) => {
    const section = termsData.sections.find(s => s.id === sectionId);
    if (!section || !section.listItems) return;

    const newListItems = [...section.listItems];
    newListItems[itemIndex] = value;
    updateSectionContent(sectionId, { listItems: newListItems });
  };

  const removeListItem = (sectionId: string, itemIndex: number) => {
    const section = termsData.sections.find(s => s.id === sectionId);
    if (!section || !section.listItems) return;

    const newListItems = section.listItems.filter((_, i) => i !== itemIndex);
    updateSectionContent(sectionId, { listItems: newListItems });
  };

  return (
    <div className="min-h-screen bg-[#F0F5F9] pb-20 mb-12">
      <Toaster position="top-right" />

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmSave}
        title="Save Changes"
        message="Are you sure you want to save all the changes made to this page? This action will update the content permanently."
        confirmText="Save Changes"
        cancelText="Cancel"
        type="success"
        isLoading={isSaving}
        requirePassword={true}
        username="admin@sifs.com"
        expectedPassword="admin123"
      />

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
          <>
            <button
              onClick={addSection}
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all font-medium"
            >
              <Plus size={18} />
              Add Section
            </button>
            <button
              onClick={handleSaveClick}
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
          </>
        )}
      </div>

      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <EditableImage
          src={termsData.heroImage}
          alt="Terms and Conditions Banner"
          editMode={editMode}
          onChange={(val) => updateTermsData({ heroImage: val })}
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md">
            <EditableText
              html={termsData.title}
              editMode={editMode}
              onChange={(val) => updateTermsData({ title: val })}
            />
          </h1>
        </div>
      </div>

      {/* Content Card */}
      <div className="max-w-6xl mx-auto -mt-16 px-4 relative z-10">
        <div className="bg-white shadow-2xl rounded-sm p-8 md:p-16 text-gray-700">

          <div className="space-y-10 text-[13px] md:text-[14px] leading-relaxed">

            {/* Dynamic Sections */}
            {termsData.sections.map((section, index) => (
              <section
                key={section.id}
                className={`relative ${section.type === 'highlight' ? 'bg-gray-50 p-8 rounded-sm border-l-4 border-[#0056B3]' : ''}`}
              >
                {editMode && (
                  <div className="absolute -left-12 top-0 flex flex-col gap-2">
                    <button
                      onClick={() => moveSection(index, 'up')}
                      disabled={index === 0}
                      className="p-1.5 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-30"
                      title="Move Up"
                    >
                      <MoveUp size={14} />
                    </button>
                    <button
                      onClick={() => moveSection(index, 'down')}
                      disabled={index === termsData.sections.length - 1}
                      className="p-1.5 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-30"
                      title="Move Down"
                    >
                      <MoveDown size={14} />
                    </button>
                    <button
                      onClick={() => toggleSectionType(section.id)}
                      className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-xs font-bold"
                      title="Toggle Type"
                    >
                      {section.type[0].toUpperCase()}
                    </button>
                    <button
                      onClick={() => removeSection(section.id)}
                      className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200"
                      title="Remove Section"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}

                {section.title && (
                  <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide">
                    <EditableText
                      html={section.title}
                      editMode={editMode}
                      onChange={(val) => updateSectionContent(section.id, { title: val })}
                    />
                  </h2>
                )}

                {section.type === 'list' && section.content && (
                  <div className="mb-4 text-sm font-semibold text-gray-500 italic">
                    <EditableText
                      html={section.content}
                      editMode={editMode}
                      onChange={(val) => updateSectionContent(section.id, { content: val })}
                    />
                  </div>
                )}

                {section.type === 'list' && section.listItems ? (
                  <ul className="list-disc ml-6 space-y-2 text-gray-600">
                    {section.listItems.map((item, itemIndex) => (
                      <li key={itemIndex} className="relative group">
                        {editMode ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => updateListItem(section.id, itemIndex, e.target.value)}
                              className="flex-1 px-2 py-1 border border-gray-300 rounded"
                            />
                            <button
                              onClick={() => removeListItem(section.id, itemIndex)}
                              className="p-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ) : (
                          item
                        )}
                      </li>
                    ))}
                    {editMode && (
                      <button
                        onClick={() => addListItem(section.id)}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <Plus size={14} /> Add Item
                      </button>
                    )}
                  </ul>
                ) : section.type !== 'list' && (
                  <div className={section.type === 'highlight' ? 'space-y-4' : ''}>
                    <EditableText
                      html={section.content}
                      editMode={editMode}
                      onChange={(val) => updateSectionContent(section.id, { content: val })}
                    />
                  </div>
                )}
              </section>
            ))}

            {/* Footer Details */}
            <section className="pt-10 border-t border-gray-100 grid md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h3 className="font-bold text-black uppercase tracking-wider">Head Office Address</h3>
                <address className="not-italic text-sm text-gray-500 leading-relaxed">
                  {termsData.address.lines.map((line, index) => (
                    <div key={index}>
                      {editMode ? (
                        <input
                          type="text"
                          value={line}
                          onChange={(e) => {
                            const newLines = [...termsData.address.lines];
                            newLines[index] = e.target.value;
                            updateTermsData({ address: { ...termsData.address, lines: newLines } });
                          }}
                          className="w-full px-2 py-1 border border-gray-300 rounded mb-1"
                        />
                      ) : (
                        <>
                          {line}
                          {index < termsData.address.lines.length - 1 && <br />}
                        </>
                      )}
                    </div>
                  ))}
                </address>
              </div>
              <div className="flex items-end md:justify-end italic text-xs text-gray-400">
                <EditableText
                  html={termsData.address.note}
                  editMode={editMode}
                  onChange={(val) => updateTermsData({ address: { ...termsData.address, note: val } })}
                />
              </div>
            </section>

          </div>
        </div>
      </div>
    </div >
  );
}