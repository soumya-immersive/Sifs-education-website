"use client";

interface CategoryWithCount {
  id?: number;
  name: string;
  count: number;
}

interface SidebarProps {
  categories: CategoryWithCount[];
  activeCategory: string;
  onSelect: (name: string) => void;
}

const JobCategoriesSidebar: React.FC<SidebarProps> = ({ categories, activeCategory, onSelect }) => {

  return (
    <div className="border-2 border-purple-50 rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Job Categories</h2>
      <div className="space-y-4">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.name;
          return (
            <div
              key={cat.name}
              onClick={() => onSelect(cat.name)}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                {/* CHECKBOX CIRCLE */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                  ${isActive ? 'border-[#D08522] bg-white' : 'border-gray-300 group-hover:border-blue-400'}`}>
                  {isActive && (
                    <svg className="w-4 h-4 text-[#D08522]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                <span className={`text-sm font-semibold transition-colors
                  ${isActive ? 'text-[#D08522]' : 'text-gray-500 group-hover:text-blue-600'}`}>
                  {cat.name}
                </span>
              </div>

              <span className={`text-sm font-bold ${isActive ? 'text-[#D08522]' : 'text-gray-400'}`}>
                ({cat.count})
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobCategoriesSidebar;