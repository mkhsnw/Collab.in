import React from "react";
import type { Category } from "../../types";

interface CategoriesSectionProps {
  categories: Category[];
  activeCategory: string;
  onCategorySelect: (categoryName: string) => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  activeCategory,
  onCategorySelect,
}) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Top Categories
            </h2>
            <p className="text-gray-600">Explore our Popular Categories</p>
          </div>
          <button
            className={`border text-gray-700 px-6 py-2 rounded-full font-medium transition-colors duration-200 hover:bg-gray-100`}
            onClick={() => onCategorySelect("All Categories")}
          >
            All Categories
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-center">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon className="w-8 h-8 text-[#584DFF]" />
                  </div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-[#584DFF] transition-colors mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">38 Courses</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Category Display */}
        {activeCategory !== "All Categories" && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Showing courses for:{" "}
              <span className="font-semibold text-blue-600">
                {activeCategory}
              </span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
