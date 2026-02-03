"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import {
  Facebook, Twitter, Linkedin, Instagram,
  Edit, Save, Loader2, Plus, Trash2, Eye
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { API_BASE_URL, BASE_URL } from "@/lib/config";

import PageBanner from "../../components/common/PageBanner";
import EditableText from "../../components/editable/EditableText";
import EditableImage from "../../components/editable/EditableImage";
import { useTeamsPageData } from "@/hooks/useTeamsPageData";
import { TeamMember } from "../../types/team";
import TeamModal from "../../components/team/TeamModal";

/* ---------------- ANIMATIONS ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const categoryMap: Record<string, string> = {
  "3": "Forensic Experts",
  "4": "Advisory Board",
};

const ITEMS_PER_VIEW = 8;

export default function TeamMembersPage() {
  const { data, updateSection, editMode, setEditMode, saveData, isLoaded } = useTeamsPageData();
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);

  // Fetch API Data
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front/team`);
        const result = await response.json();

        if (result.success && result.data && Array.isArray(result.data.members)) {
          const mappedMembers: TeamMember[] = result.data.members.map((item: any) => {
            // Image handling
            let imageUrl = item.image || "";
            if (imageUrl) {
              imageUrl = imageUrl.replace(/\\/g, "/");
              if (!imageUrl.startsWith("http")) {
                imageUrl = `${BASE_URL}/uploads/Education-And-Internship-Admin-Member/${imageUrl}`;
              }
            }

            // Category Mapping
            const catId = (item.team_category_id || "").toString().trim();
            const categoryName = categoryMap[catId] || "Other";

            // Helper to clean strings
            const clean = (str: any) => (str ? str.toString().replace(/^"|"$/g, '') : "");

            return {
              id: item.id.toString(),
              name: clean(item.name) || "Unknown",
              role: clean(item.rank),
              category: categoryName,
              image: imageUrl,
              description: clean(item.about),
              slug: item.slug, // Map slug for detailed fetch
              socials: {
                facebook: clean(item.facebook) || "#",
                twitter: clean(item.twitter) || "#",
                instagram: clean(item.instagram) || "#",
                linkedin: clean(item.linkedin) || "#"
              }
            };
          });

          // Update Team Data
          updateSection("team", mappedMembers);

          // Update Filters dynamically based on categories found
          const uniqueCategories = Array.from(new Set(mappedMembers.map(m => m.category))).sort();
          updateSection("filters", ["All", ...uniqueCategories]);
        } else {
          console.error("Invalid API structure:", result);
          toast.error("Invalid API response format");
        }
      } catch (error) {
        console.error("Failed to fetch team data:", error);
        toast.error("Failed to load team data from API");
      }
    };

    fetchTeam();
  }, []);

  // Initialize filters 
  const filters = data.filters || ["All"];

  /* ---------- FILTER DATA ---------- */
  const filteredTeam: TeamMember[] = useMemo(() => {
    return activeFilter === "All"
      ? data.team
      : data.team.filter((m) => m.category === activeFilter);
  }, [activeFilter, data.team]);

  // Show all items if user clicked "Show All" OR if we are in Edit Mode
  const visibleTeam = showAll || editMode
    ? filteredTeam
    : filteredTeam.slice(0, ITEMS_PER_VIEW);

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

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      saveData();
      setEditMode(false);
      setIsSaving(false);
      toast.success("✅ Content saved successfully");
    }, 800);
  };

  const handleMemberClick = async (member: TeamMember) => {
    // In edit mode, we use local state only
    if (editMode) {
      setSelectedMember(member);
      return;
    }

    // Validate slug
    if (!member.slug) {
      setSelectedMember(member);
      return;
    }

    const toastId = toast.loading("Loading details...");
    try {
      // console.log(`Fetching details for: ${member.slug}`);
      const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front/team-details/${member.slug}`);
      const result = await response.json();

      if (result.success && result.data && result.data.members) {
        const m = result.data.members;
        const clean = (str: any) => (str ? str.toString().replace(/^"|"$/g, '') : "");

        let imageUrl = m.image || "";
        if (imageUrl) {
          imageUrl = imageUrl.replace(/\\/g, "/");
          if (!imageUrl.startsWith("http")) {
            imageUrl = `${BASE_URL}/uploads/Education-And-Internship-Admin-Member/${imageUrl}`;
          }
        }

        const detailedMember: TeamMember = {
          ...member,
          name: clean(m.name),
          role: clean(m.rank),
          description: clean(m.about),
          image: imageUrl,
          education: clean(m.education),
          slug: m.slug,
          socials: {
            facebook: clean(m.facebook) || "#",
            twitter: clean(m.twitter) || "#",
            instagram: clean(m.instagram) || "#",
            linkedin: clean(m.linkedin) || "#"
          }
        };

        setSelectedMember(detailedMember);
      } else {
        // Fallback
        setSelectedMember(member);
      }
    } catch (error) {
      console.error("Failed to fetch member details:", error);
      toast.error("Could not load additional details");
      setSelectedMember(member);
    } finally {
      toast.dismiss(toastId);
    }
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

    // Update categories in team list to match
    const updatedTeam = data.team.map(m => m.category === oldName ? { ...m, category: newName } : m);
    updateSection("team", updatedTeam);

    if (activeFilter === oldName) setActiveFilter(newName);
  };

  const deleteFilter = (index: number) => {
    const filterToDelete = filters[index];
    if (filterToDelete === "All") return;
    if (confirm(`Delete category "${filterToDelete}"? Members in this category will default to "Core Team".`)) {
      const newFilters = filters.filter((_, i) => i !== index);
      updateSection("filters", newFilters);

      // Reassign members in deleted category
      const updatedTeam = data.team.map(m => m.category === filterToDelete ? { ...m, category: "Core Team" } : m);
      updateSection("team", updatedTeam);

      if (activeFilter === filterToDelete) setActiveFilter("All");
    }
  };

  /* ----- TEAM MEMBER HANDLERS ----- */
  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: `team-${Date.now()}`,
      name: "New Team Member",
      role: "Role / Designation",
      category: activeFilter === "All" ? "Core Team" : activeFilter,
      image: "/teams/team1.png",
      description: "Enter detailed description here...",
      socials: { facebook: "#", linkedin: "#" }
    };
    updateSection("team", [...data.team, newMember]);
    toast.success("New team member added!");
  };

  const removeTeamMember = (id: string) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      const updated = data.team.filter(m => m.id !== id);
      updateSection("team", updated);
      toast.success("Team member deleted");
      if (selectedMember?.id === id) setSelectedMember(null);
    }
  };

  const updateMember = (id: string, field: keyof TeamMember | 'socials', value: any) => {
    const updated = data.team.map(m => {
      if (m.id === id) {
        const newMember = field === 'socials'
          ? { ...m, socials: { ...m.socials, ...value } }
          : { ...m, [field]: value };

        // If this is the currently selected member in the modal, update that state too
        if (selectedMember?.id === id) {
          setSelectedMember(newMember);
        }
        return newMember;
      }
      return m;
    });
    updateSection("team", updated);
  };

  const handleModalSave = () => {
    saveData();
    toast.success("Details saved successfully");
    setSelectedMember(null);
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white min-h-screen relative w-full mb-20">
      <Toaster position="top-right" />

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

      {/* ================= BANNER ================= */}
      <div className="relative">
        {editMode ? (
          <div className="relative group h-[300px]">
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

      <div className="max-w-7xl mx-auto px-4 py-14 md:py-20">

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
                      ? "bg-[#0b5ed7] text-white"
                      : "bg-white text-[#0b5ed7] hover:bg-[#0b5ed7] hover:text-white"
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

        {/* GRID */}
        {visibleTeam.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
            <AnimatePresence>
              {visibleTeam.map((member) => (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="group text-center relative"
                >
                  {editMode && (
                    <button
                      onClick={() => removeTeamMember(member.id)}
                      className="absolute top-2 right-2 z-50 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete Member"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}

                  {/* IMAGE */}
                  <div className="relative overflow-hidden rounded-xl bg-gray-100 h-[240px]">
                    <EditableImage
                      src={member.image}
                      editMode={editMode}
                      onChange={(src) => updateMember(member.id, 'image', src)}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
                    />

                    {/* HOVER OVERLAY - ONLY IN VIEW MODE */}
                    {!editMode && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <button
                          onClick={() => handleMemberClick(member)}
                          className="px-4 py-2 text-sm border border-white text-white rounded hover:bg-white hover:text-black transition"
                        >
                          Read More
                        </button>
                      </div>
                    )}
                  </div>

                  <h4 className="mt-4 font-semibold text-gray-900">
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

                      {/* EDIT DESCRIPTION BUTTON */}
                      <div className="mb-3">
                        <button
                          onClick={() => setSelectedMember(member)}
                          className="text-xs text-blue-600 underline"
                        >
                          Edit Description via Modal
                        </button>
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
            <p className="text-sm mt-1">There are no team members in this category yet.</p>
          </div>
        )}

        {editMode && (
          <div className="flex justify-center mt-10">
            <button
              onClick={addTeamMember}
              className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors border border-blue-200 shadow-sm"
            >
              <Plus size={20} /> Add Team Member
            </button>
          </div>
        )}

        {/* READ MORE GRID */}
        {filteredTeam.length > ITEMS_PER_VIEW && !editMode && (
          <div className="flex justify-center mt-16">
            <button
              onClick={() => setShowAll((p) => !p)}
              className="px-6 py-2 rounded-md border border-[#0b5ed7]
                           text-[#0b5ed7] hover:bg-[#0b5ed7] hover:text-white transition"
            >
              {showAll ? "Read Less" : "Read More"}
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedMember && (
          // In edit mode, we might want to pass 'editable' props to modal? For now, standard modal.
          // TODO: If detailed bio needs editing, we should likely update TeamModal to support editable text when a prop is passed.
          <TeamModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
            editMode={editMode}
            onUpdate={updateMember}
            onSave={handleModalSave}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
