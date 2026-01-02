"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Plus, Trash2, X, Upload } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";
import EditableImage from "../editable/EditableImage";
import EditableText from "../editable/EditableText";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

interface ClientsPortfolioProps {
  data: {
    headingPrefix: string;
    headingHighlight: string;
    headingSuffix: string;
    categories?: string[];
    items: {
      logo: string;
      category: string;
    }[];
  };
  editMode: boolean;
  updateData: (data: any) => void;
}

export default function SatisfiedClientsPortfolio({
  data,
  editMode,
  updateData
}: ClientsPortfolioProps) {
  const [activeTab, setActiveTab] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClientCategory, setNewClientCategory] = useState("");
  const [newClientImage, setNewClientImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultCategories = [
    "Institution",
    "Law Enforcement",
    "Forensic Labs",
    "Financial Group",
    "Corporate",
    "Organization",
    "Others"
  ];

  const categories = data?.categories || defaultCategories;

  useEffect(() => {
    if (data && !data.categories) {
      updateData({ ...data, categories: defaultCategories });
    }
  }, [data]);

  if (!data) return null;

  const filtered =
    activeTab === "All"
      ? data.items
      : data.items.filter((c) => c.category === activeTab);

  const getOriginalIndex = (item: any) => data.items.indexOf(item);

  const updateClientLogo = (item: any, newLogo: string) => {
    const index = getOriginalIndex(item);
    if (index === -1) return;
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], logo: newLogo };
    updateData({ ...data, items: newItems });
  };

  const deleteClient = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this client?")) {
      const newItems = data.items.filter(i => i !== item);
      updateData({ ...data, items: newItems });
    }
  };

  const updateCategoryName = (index: number, newName: string) => {
    const oldName = categories[index];
    const newCategories = [...categories];
    newCategories[index] = newName;

    const newItems = data.items.map(item =>
      item.category === oldName ? { ...item, category: newName } : item
    );

    updateData({ ...data, categories: newCategories, items: newItems });

    if (activeTab === oldName) setActiveTab(newName);
  };

  const addCategory = () => {
    const name = prompt("Enter new category name:");
    if (name && !categories.includes(name)) {
      updateData({ ...data, categories: [...categories, name] });
    }
  };

  const removeCategory = (cat: string) => {
    if (confirm(`Delete category "${cat}"? Items in this category will remain but the tab will be hidden.`)) {
      const newCategories = categories.filter(c => c !== cat);
      updateData({ ...data, categories: newCategories });
      if (activeTab === cat) setActiveTab("All");
    }
  };

  const handleAddClient = () => {
    setNewClientCategory(categories[0] || "Others");
    setNewClientImage(null);
    setShowAddModal(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewClientImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const confirmAddClient = () => {
    if (!newClientImage) {
      alert("Please select an image for the client.");
      return;
    }
    const newItem = {
      logo: newClientImage,
      category: newClientCategory
    };
    updateData({ ...data, items: [...data.items, newItem] });
    setShowAddModal(false);
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-center text-3xl font-semibold mb-8 text-black">
          <EditableText
            html={data.headingPrefix}
            editMode={editMode}
            onChange={(val) => updateData({ ...data, headingPrefix: val })}
          />{" "}
          <span className="relative inline-block">
            <span className="relative z-10">
              <EditableText
                html={data.headingHighlight}
                editMode={editMode}
                onChange={(val) => updateData({ ...data, headingHighlight: val })}
              />
            </span>
            <Image
              src="/yellow-underline.png"
              alt=""
              width={150}
              height={14}
              className="absolute left-1/2 -translate-x-1/2 -bottom-1 z-0"
            />
          </span>{" "}
          <EditableText
            html={data.headingSuffix}
            editMode={editMode}
            onChange={(val) => updateData({ ...data, headingSuffix: val })}
          />
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm items-center">
          <button
            onClick={() => setActiveTab("All")}
            className={`relative pb-1 ${activeTab === "All"
              ? "text-blue-600 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-blue-600"
              : "text-gray-500"
              }`}
          >
            All
          </button>

          {categories.map((tab, idx) => (
            <div key={idx} className="relative group flex items-center">
              {editMode ? (
                <div className="flex items-center gap-1 bg-gray-50 rounded px-2 py-1">
                  <input
                    value={tab}
                    onChange={(e) => updateCategoryName(idx, e.target.value)}
                    className="bg-transparent border-b border-dashed border-gray-400 focus:outline-none w-auto min-w-[60px] text-center text-xs"
                  />
                  <button
                    onClick={() => removeCategory(tab)}
                    className="text-red-500 hover:bg-red-100 rounded-full p-0.5"
                    title="Remove Category"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-1 ${activeTab === tab
                    ? "text-blue-600 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-blue-600"
                    : "text-gray-500"
                    }`}
                >
                  {tab}
                </button>
              )}
            </div>
          ))}

          {editMode && (
            <button onClick={addCategory} className="flex items-center gap-1 text-green-600 hover:bg-green-50 px-2 py-1 rounded text-xs border border-green-200 bg-green-50/50">
              <Plus size={12} /> Add Tab
            </button>
          )}
        </div>

        {/* Slider Container */}
        <div className="relative border border-blue-300 rounded-2xl px-12 py-8 bg-[#F0F4F5] min-h-[300px]">

          {/* Arrows */}
          <button className="swiper-prev cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 w-12 h-12 shadow-lg bg-[#008DD2] text-white rounded-full flex items-center justify-center hover:scale-105 transition z-10">
            <ChevronLeft />
          </button>

          <button className="swiper-next cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 w-12 h-12 bg-[#008DD2] text-white rounded-full flex items-center justify-center hover:scale-105 transition z-10">
            <ChevronRight />
          </button>

          {editMode && (
            <div className="absolute top-2 right-2 z-20">
              <button
                onClick={handleAddClient}
                className="flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs hover:bg-green-700 shadow-md transition"
              >
                <Plus size={14} /> Add Client
              </button>
            </div>
          )}

          <Swiper
            modules={[Navigation, Grid]}
            grid={{ rows: 2, fill: "row" }}
            slidesPerView={2}
            spaceBetween={20}
            autoplay={editMode ? false : {
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={false} // Grid with loop can be tricky, often requires loopAddBlankSlides or fixed clusters.
            // Setting loop to false for Edit safety, or true if sufficient items.
            // If exact rows needed, spaceBetween applies to columns.
            // Row gap in Swiper Grid is handled manually via slide height or custom css if `spaceBetween` doesn't apply to rows (it usually doesn't apply to grid rows primarily in older versions).
            // In v9/10, spaceBetween applies to grid rows too if configured correctly.
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 30 },
              768: { slidesPerView: 4, spaceBetween: 30 },
              1024: { slidesPerView: 6, spaceBetween: 30 },
            }}
            className="!pb-0"
          >
            {filtered.map((item, i) => (
              <SwiperSlide key={i} className="!h-auto">
                {/* Added margin-bottom to create visual space between rows if Swiper doesn't handle it, 
                                    but with grid rows=2, we need to be careful. 
                                    Better approach: Use a fixed height container with flex adjustment. */}
                <div className="group relative flex items-center justify-center border border-blue-200 bg-white/50 rounded-xl p-4 h-[120px] mb-6 last:mb-0 hover:bg-white hover:shadow-sm transition-all">
                  <EditableImage
                    src={item.logo}
                    alt="Client"
                    editMode={editMode}
                    className="object-contain w-full h-full max-h-[80px]"
                    onChange={(newSrc) => updateClientLogo(item, newSrc)}
                  />

                  {editMode && (
                    <button
                      onClick={(e) => deleteClient(e, item)}
                      className="absolute -top-2 -right-2 bg-red-100 text-red-600 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200 z-10 shadow-sm border border-red-200"
                      title="Delete Client"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                  {editMode && (
                    <div className="absolute bottom-1 left-0 w-full text-center text-[10px] text-gray-400 pointer-events-none lowercase opacity-60">
                      {item.category}
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Modal for Adding Client */}
      {showAddModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-[400px] animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Add New Client</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newClientCategory}
                  onChange={(e) => setNewClientCategory(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-sm"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client Logo</label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {newClientImage ? (
                    <div className="relative w-full h-24">
                      <img src={newClientImage} alt="Preview" className="w-full h-full object-contain" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded">
                        <span className="text-white text-xs font-medium">Change</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-2">
                        <Upload size={20} />
                      </div>
                      <p className="text-sm text-gray-500">Click to upload logo</p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmAddClient}
                disabled={!newClientImage}
                className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${newClientImage ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
              >
                Add Client
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
