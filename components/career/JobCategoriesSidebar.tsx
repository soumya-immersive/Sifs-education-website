import React from "react";
import { Plus, Trash2 } from "lucide-react";
import EditableText from "../editable/EditableText";
import { CareerCategory } from "@/types/career-page";

interface CategoryWithCount extends CareerCategory {
  count: number;
}

interface SidebarProps {
  activeCategory: string;
  onSelect: (name: string) => void;
  categories: CategoryWithCount[];
  editMode?: boolean;
  onUpdateCategory?: (id: number, name: string) => void;
  onDeleteCategory?: (id: number) => void;
  onAddCategory?: () => void;
}

const JobCategoriesSidebar: React.FC<SidebarProps> = ({
  activeCategory,
  onSelect,
  categories,
  editMode = false,
  onUpdateCategory,
  onDeleteCategory,
  onAddCategory
}) => {
  return (
    <div className="border-2 border-purple-50 rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Job Categories</h2>
        {editMode && onAddCategory && (
          <button
            onClick={onAddCategory}
            className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            title="Add Category"
          >
            <Plus size={18} />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.name;
          return (
            <div
              key={cat.id}
              className="group relative"
            >
              <div
                onClick={() => onSelect(cat.name)}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3 flex-1 overflow-hidden">
                  {/* CHECKBOX CIRCLE */}
                  <div className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center transition-all
                    ${isActive ? 'border-[#D08522] bg-white' : 'border-gray-300 group-hover:border-blue-400'}`}>
                    {isActive && (
                      <svg className="w-4 h-4 text-[#D08522]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>

                  <div className={`text-sm font-semibold transition-colors flex-1
                    ${isActive ? 'text-[#D08522]' : 'text-gray-500 group-hover:text-blue-600'}`}>
                    <EditableText
                      html={cat.name}
                      editMode={editMode}
                      onChange={(h) => onUpdateCategory?.(cat.id, h)}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${isActive ? 'text-[#D08522]' : 'text-gray-400'}`}>
                    ({cat.count})
                  </span>

                  {editMode && cat.name !== "All" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteCategory?.(cat.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobCategoriesSidebar;

