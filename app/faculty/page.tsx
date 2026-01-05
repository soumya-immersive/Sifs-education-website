"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram, Edit, Save, Loader2, Plus, Trash2 } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

import PageBanner from "../../components/common/PageBanner";
import EditableText from "../../components/editable/EditableText";
import EditableImage from "../../components/editable/EditableImage";
import { useFacultyPageData } from "@/hooks/useFacultyPageData";
import { FacultyMember } from "../../types/faculty";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";

/* ---------------- ANIMATIONS ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

/* ---------------- FILTERS ---------------- */
const defaultFilters = ["All", "Adjunct Faculty", "Instructors"];

const ITEMS_PER_VIEW = 8;

export default function FacultiesPage() {
  const { data, updateSection, editMode, setEditMode, saveData, isLoaded } = useFacultyPageData();
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [editingFilterIndex, setEditingFilterIndex] = useState<number | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Initialize filters if missing (backward compatibility)
  const filters = data.filters || defaultFilters;

  /* ---------- FILTER DATA ---------- */
  const filteredFaculty: FacultyMember[] = useMemo(() => {
    return activeFilter === "All"
      ? data.faculty
      : data.faculty.filter((f) => f.category === activeFilter);
  }, [activeFilter, data.faculty]);

  // Show all items if user clicked "Show All" OR if we are in Edit Mode
  const visibleFaculty = showAll || editMode
    ? filteredFaculty
    : filteredFaculty.slice(0, ITEMS_PER_VIEW);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const handleEditClick = () => {
    setIsEditLoading(true);
    setTimeout(() => {
      setEditMode(true);
      setIsEditLoading(false);
    }, 600);
  };

  const handleSaveClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      saveData();
      setEditMode(false);
      setIsSaving(false);
      setShowConfirmation(false);
      toast.success("✅ Content saved successfully");
    }, 800);
  };

  /* ----- FILTER HANDLERS ----- */
  const addFilter = () => {
    const newFilterName = "New Category";
    updateSection("filters", [...filters, newFilterName]);
  };

  const updateFilterName = (index: number, newName: string) => {
    const newFilters = [...filters];
    const oldName = newFilters[index];
    newFilters[index] = newName;
    updateSection("filters", newFilters);

    // Update categories in faculty list to match
    const updatedFaculty = data.faculty.map(f => f.category === oldName ? { ...f, category: newName } : f);
    updateSection("faculty", updatedFaculty);

    if (activeFilter === oldName) setActiveFilter(newName);
  };

  const deleteFilter = (index: number) => {
    const filterToDelete = filters[index];
    if (filterToDelete === "All") return;
    if (confirm(`Delete category "${filterToDelete}"? Faculty in this category will default to "Adjunct Faculty".`)) {
      const newFilters = filters.filter((_, i) => i !== index);
      updateSection("filters", newFilters);

      // Reassign faculty in deleted category
      const updatedFaculty = data.faculty.map(f => f.category === filterToDelete ? { ...f, category: "Adjunct Faculty" } : f);
      updateSection("faculty", updatedFaculty);

      if (activeFilter === filterToDelete) setActiveFilter("All");
    }
  };

  /* ----- FACULTY HANDLERS ----- */
  const addFacultyMember = () => {
    const newMember: FacultyMember = {
      id: `faculty-${Date.now()}`,
      name: "New Faculty Member",
      role: "Role / Designation",
      category: activeFilter === "All" ? "Adjunct Faculty" : activeFilter,
      image: "/faculty/1.png",
      socials: {
        facebook: "#",
        linkedin: "#"
      }
    };
    updateSection("faculty", [...data.faculty, newMember]);
    toast.success("New faculty member added!");
  };

  const removeFacultyMember = (id: string) => {
    if (confirm("Are you sure you want to delete this faculty member?")) {
      const updated = data.faculty.filter(f => f.id !== id);
      updateSection("faculty", updated);
      toast.success("Faculty member deleted");
    }
  };

  const updateMember = (id: string, field: keyof FacultyMember | 'socials', value: any) => {
    const updated = data.faculty.map(f => {
      if (f.id === id) {
        if (field === 'socials') {
          return { ...f, socials: { ...f.socials, ...value } };
        }
        return { ...f, [field]: value };
      }
      return f;
    });
    updateSection("faculty", updated);
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white min-h-screen relative">
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

      {/* Global Edit Control */}
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
        )}
      </div>

      {/* ================= BANNER ================= */}
      <div className="relative">
        {editMode ? (
          <div className="relative group h-[300px]">
            {/* Background Image Display - Not EditableImage here because we want manual control over the upload button */}
            <img
              src={data.hero.bgImage}
              alt="Banner Background"
              className="w-full h-full object-cover"
            />

            {/* Custom Upload Button - Top Right */}
            <div className="absolute top-4 right-4 z-50">
              <label className="cursor-pointer bg-white text-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-50 transition-colors flex items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        updateSection("hero", { ...data.hero, bgImage: reader.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <Edit size={20} />
              </label>
            </div>

            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
              <div className="text-3xl md:text-4xl font-extrabold mb-2">
                <EditableText
                  html={data.hero.title}
                  editMode={editMode}
                  onChange={(val) => updateSection("hero", { ...data.hero, title: val })}
                />
              </div>
              <div className="text-sm md:text-base opacity-90">
                <EditableText
                  html={data.hero.subtitle as string}
                  editMode={editMode}
                  onChange={(val) => updateSection("hero", { ...data.hero, subtitle: val })}
                />
              </div>
            </div>
          </div>
        ) : (
          <PageBanner
            title={data.hero.title}
            subtitle={data.hero.subtitle}
            bgImage={data.hero.bgImage}
          />
        )}
      </div>


      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 py-14 md:py-20 mb-12">

        {/* ================= FILTER TABS ================= */}
        <div className="flex flex-wrap justify-center gap-2 mb-14 items-center">
          {filters.map((filter, index) => (
            <div key={index} className="relative group">
              {editMode && filter !== "All" ? (
                <div className="flex items-center">
                  <input
                    value={filter}
                    onChange={(e) => updateFilterName(index, e.target.value)}
                    className={`px-4 py-2 text-sm border rounded-md transition outline-none focus:ring-2 focus:ring-blue-400
                                    ${activeFilter === filter ? "bg-[#0b5ed7] text-white border-[#0b5ed7]" : "bg-white text-[#0b5ed7] border-[#0b5ed7]"}`}
                  />
                  <button
                    onClick={() => deleteFilter(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    title="Delete Category"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setActiveFilter(filter);
                    setShowAll(false);
                  }}
                  className={`px-4 py-2 text-sm border rounded-md transition
                            ${activeFilter === filter
                      ? "bg-[#0b5ed7] text-white border-[#0b5ed7]"
                      : "bg-white text-[#0b5ed7] border-[#0b5ed7] hover:bg-[#0b5ed7] hover:text-white"
                    }`}
                >
                  {filter}
                </button>
              )}
            </div>
          ))}
          {editMode && (
            <button
              onClick={addFilter}
              className="flex items-center gap-1 px-3 py-2 text-sm text-green-600 bg-green-50 hover:bg-green-100 rounded-md border border-green-200 transition-colors"
            >
              <Plus size={14} /> Add Category
            </button>
          )}
        </div>

        {/* ================= GRID ================= */}
        {visibleFaculty.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
            <AnimatePresence>
              {visibleFaculty.map((member) => (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="group relative"
                >
                  {editMode && (
                    <button
                      onClick={() => removeFacultyMember(member.id)}
                      className="absolute top-2 right-2 z-50 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete Member"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}

                  {/* IMAGE CONTAINER */}
                  <div className="relative overflow-hidden rounded-xl bg-gray-100 group h-[240px]">
                    <EditableImage
                      src={member.image}
                      editMode={editMode}
                      onChange={(src) => updateMember(member.id, 'image', src)}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
                    />

                    {/* SOCIAL OVERLAY - ONLY IN VIEW MODE */}
                    {!editMode && (
                      <div
                        className={`absolute inset-0 flex items-end justify-center 
                            bg-gradient-to-t from-black/80 via-black/40 to-transparent transition duration-300 text-white
                            ${member.socials && Object.values(member.socials).some(s => s && s !== "#") ? "opacity-0 group-hover:opacity-100" : "opacity-0 hidden"}`}
                      >
                        <div className="flex gap-3 pb-6">
                          {member.socials?.facebook && member.socials.facebook !== "#" && (
                            <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer" className="bg-white/20 p-2 rounded-full hover:bg-white hover:text-[#0b5ed7] transition-all">
                              <Facebook size={16} />
                            </a>
                          )}
                          {member.socials?.twitter && member.socials.twitter !== "#" && (
                            <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="bg-white/20 p-2 rounded-full hover:bg-white hover:text-[#0b5ed7] transition-all">
                              <Twitter size={16} />
                            </a>
                          )}
                          {member.socials?.linkedin && member.socials.linkedin !== "#" && (
                            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="bg-white/20 p-2 rounded-full hover:bg-white hover:text-[#0b5ed7] transition-all">
                              <Linkedin size={16} />
                            </a>
                          )}
                          {member.socials?.instagram && member.socials.instagram !== "#" && (
                            <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="bg-white/20 p-2 rounded-full hover:bg-white hover:text-[#0b5ed7] transition-all">
                              <Instagram size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* INFO */}
                  <div className="text-center p-4">
                    <h4 className="font-semibold text-gray-900 text-lg">
                      <EditableText
                        html={member.name}
                        editMode={editMode}
                        onChange={(val) => updateMember(member.id, 'name', val)}
                      />
                    </h4>
                    <div className="text-sm text-[#0b5ed7] mt-1">
                      <EditableText
                        html={member.role}
                        editMode={editMode}
                        onChange={(val) => updateMember(member.id, 'role', val)}
                      />
                    </div>

                    {editMode && (
                      <div className="mt-4 border-t pt-3">
                        {/* CATEGORY SELECTOR */}
                        <div className="text-xs text-gray-400 mb-2 flex items-center justify-center gap-2">
                          <span>Category:</span>
                          <select
                            value={member.category}
                            onChange={(e) => updateMember(member.id, 'category', e.target.value)}
                            className="border rounded p-1 text-gray-700"
                          >
                            {filters.filter(f => f !== 'All').map(f => (
                              <option key={f} value={f}>{f}</option>
                            ))}
                          </select>
                        </div>

                        {/* SOCIAL INPUTS - EDIT MODE ONLY */}
                        <div className="flex flex-col gap-2 w-full text-xs">
                          <div className="flex bg-gray-100 rounded items-center p-1 border focus-within:border-blue-400">
                            <Facebook size={14} className="mr-2 text-blue-600 shrink-0" />
                            <input
                              type="text"
                              placeholder="Facebook URL"
                              className="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-400 text-xs"
                              value={member.socials?.facebook || ""}
                              onChange={(e) => updateMember(member.id, 'socials', { facebook: e.target.value })}
                            />
                            {member.socials?.facebook && (
                              <button onClick={() => updateMember(member.id, 'socials', { facebook: "" })} className="text-gray-400 hover:text-red-500 ml-1">
                                <Trash2 size={12} />
                              </button>
                            )}
                          </div>
                          <div className="flex bg-gray-100 rounded items-center p-1 border focus-within:border-blue-400">
                            <Twitter size={14} className="mr-2 text-blue-400 shrink-0" />
                            <input
                              type="text"
                              placeholder="Twitter URL"
                              className="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-400 text-xs"
                              value={member.socials?.twitter || ""}
                              onChange={(e) => updateMember(member.id, 'socials', { twitter: e.target.value })}
                            />
                            {member.socials?.twitter && (
                              <button onClick={() => updateMember(member.id, 'socials', { twitter: "" })} className="text-gray-400 hover:text-red-500 ml-1">
                                <Trash2 size={12} />
                              </button>
                            )}
                          </div>
                          <div className="flex bg-gray-100 rounded items-center p-1 border focus-within:border-blue-400">
                            <Linkedin size={14} className="mr-2 text-blue-700 shrink-0" />
                            <input
                              type="text"
                              placeholder="LinkedIn URL"
                              className="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-400 text-xs"
                              value={member.socials?.linkedin || ""}
                              onChange={(e) => updateMember(member.id, 'socials', { linkedin: e.target.value })}
                            />
                            {member.socials?.linkedin && (
                              <button onClick={() => updateMember(member.id, 'socials', { linkedin: "" })} className="text-gray-400 hover:text-red-500 ml-1">
                                <Trash2 size={12} />
                              </button>
                            )}
                          </div>
                          <div className="flex bg-gray-100 rounded items-center p-1 border focus-within:border-blue-400">
                            <Instagram size={14} className="mr-2 text-pink-600 shrink-0" />
                            <input
                              type="text"
                              placeholder="Instagram URL"
                              className="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-400 text-xs"
                              value={member.socials?.instagram || ""}
                              onChange={(e) => updateMember(member.id, 'socials', { instagram: e.target.value })}
                            />
                            {member.socials?.instagram && (
                              <button onClick={() => updateMember(member.id, 'socials', { instagram: "" })} className="text-gray-400 hover:text-red-500 ml-1">
                                <Trash2 size={12} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <div className="opacity-50 text-4xl">👥</div>
            </div>
            <h3 className="text-lg font-medium text-gray-500">No members found</h3>
            <p className="text-sm mt-1">There are no faculty members in this category yet.</p>
          </div>
        )}

        {editMode && (
          <div className="flex justify-center mt-10">
            <button
              onClick={addFacultyMember}
              className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors border border-blue-200 shadow-sm"
            >
              <Plus size={20} /> Add Faculty Member
            </button>
          </div>
        )}

        {/* ================= LOAD MORE ================= */}
        {filteredFaculty.length > ITEMS_PER_VIEW && !editMode && (
          <div className="flex justify-center mt-16">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="px-6 py-2 rounded-md border border-[#0b5ed7]
                         text-[#0b5ed7] font-medium
                         hover:bg-[#0b5ed7] hover:text-white transition"
            >
              {showAll ? "Show Less" : "Load More"}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
