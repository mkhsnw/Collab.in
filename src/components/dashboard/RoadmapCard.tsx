import React from "react";
import {
  CheckCircleIcon,
  PlayIcon,
  BookOpenIcon,
  Clock3Icon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
interface RoadmapType {
  id: number;
  title: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  status: string;
  image: string;
  nextLesson?: {
    title: string;
    duration: string;
  };
  completionDate?: string;
}
interface RoadmapCardProps {
  roadmap: RoadmapType;
}
export const RoadmapCard: React.FC<RoadmapCardProps> = ({ roadmap }) => {
  const navigate = useNavigate();
  const isCompleted = roadmap.status === "completed";
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-40 overflow-hidden relative">
        <img
          src={roadmap.image}
          alt={roadmap.title}
          className="w-full h-full object-cover"
        />
        {isCompleted && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-full p-2">
              <CheckCircleIcon size={24} className="text-green-500" />
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-gray-800">{roadmap.title}</h3>
          {isCompleted && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              Finish
            </span>
          )}
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <BookOpenIcon size={14} className="mr-1" />
          <span>
            {roadmap.completedModules} dari {roadmap.totalModules} modul
            Finished
          </span>
        </div>
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Progress</span>
            <span className="text-xs font-medium">{roadmap.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full ${
                isCompleted ? "bg-green-500" : "bg-[#504DFF]"
              }`}
              style={{
                width: `${roadmap.progress}%`,
              }}
            ></div>
          </div>
        </div>
        {!isCompleted && roadmap.nextLesson && (
          <div className="mb-4 bg-gray-50 rounded-lg p-2 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <PlayIcon size={14} className="text-[#504DFF] mr-1" />
                <span className="text-xs text-gray-700 truncate">
                  {roadmap.nextLesson.title}
                </span>
              </div>
              <div className="flex items-center">
                <Clock3Icon size={14} className="text-gray-400 mr-1" />
                <span className="text-xs text-gray-500">
                  {roadmap.nextLesson.duration}
                </span>
              </div>
            </div>
          </div>
        )}
        {isCompleted ? (
          <button
            className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            onClick={() => navigate(`/portfolio/${roadmap.id}`)}
          >
            View Certificate
          </button>
        ) : (
          <button
            className="w-full bg-[#504DFF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#403DC9] transition-colors"
            onClick={() => navigate(`/video/${roadmap.id}`)}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};
