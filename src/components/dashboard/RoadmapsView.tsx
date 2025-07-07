import React, { useState } from "react";
import { RoadmapCard } from "./RoadmapCard";
import { SearchIcon, FilterIcon } from "lucide-react";
import { roadmapsData } from "../../data/dashboardData";
export const RoadmapsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const filteredRoadmaps =
    activeTab === "all"
      ? roadmapsData
      : roadmapsData.filter((roadmap) =>
          activeTab === "in-progress"
            ? roadmap.status === "in-progress"
            : roadmap.status === "completed"
        );
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">My Learning Path</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  activeTab === "all"
                    ? "bg-[#504DFF] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab("in-progress")}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  activeTab === "in-progress"
                    ? "bg-[#504DFF] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Learning
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  activeTab === "completed"
                    ? "bg-[#504DFF] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Finish
              </button>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center">
              <div className="relative mr-2">
                <input
                  type="text"
                  placeholder="Search Roadmaps..."
                  className="bg-gray-100 pl-8 pr-4 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#504DFF] w-full sm:w-48"
                />
                <SearchIcon
                  size={16}
                  className="absolute left-2.5 top-2 text-gray-500"
                />
              </div>
              <button className="p-1.5 rounded-lg hover:bg-gray-100">
                <FilterIcon size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-5">
          {filteredRoadmaps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRoadmaps.map((roadmap) => (
                <RoadmapCard key={roadmap.id} roadmap={roadmap} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">Tidak ada roadmap yang ditemukan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
