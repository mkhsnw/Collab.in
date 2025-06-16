import React from 'react';
import { BookOpenIcon, Clock3Icon } from 'lucide-react';
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
interface LearningProgressProps {
  roadmaps: RoadmapType[];
}
export const LearningProgress: React.FC<LearningProgressProps> = ({
  roadmaps
}) => {
  const activeRoadmaps = roadmaps.filter(roadmap => roadmap.status === 'in-progress');
  const featuredRoadmap = activeRoadmaps[0];
  return <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">
          Progress Belajar
        </h2>
      </div>
      {featuredRoadmap && <div className="p-5 border-b border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <img src={featuredRoadmap.image} alt={featuredRoadmap.title} className="w-full md:w-32 h-32 rounded-lg object-cover" />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-800">
                {featuredRoadmap.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {featuredRoadmap.completedModules} dari{' '}
                {featuredRoadmap.totalModules} modul selesai
              </p>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-[#504DFF] h-2.5 rounded-full" style={{
              width: `${featuredRoadmap.progress}%`
            }}></div>
              </div>
              {featuredRoadmap.nextLesson && <div className="mt-4 bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <p className="text-sm font-medium text-gray-700">
                    Pelajaran selanjutnya:
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center">
                      <BookOpenIcon size={16} className="text-[#504DFF] mr-2" />
                      <span className="text-sm">
                        {featuredRoadmap.nextLesson.title}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock3Icon size={16} className="text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">
                        {featuredRoadmap.nextLesson.duration}
                      </span>
                    </div>
                  </div>
                </div>}
              <button className="mt-4 bg-[#504DFF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#403DC9] transition-colors">
                Lanjutkan Belajar
              </button>
            </div>
          </div>
        </div>}
      <div className="p-5">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Roadmap Lainnya
        </h3>
        <div className="space-y-3">
          {roadmaps.slice(1, 3).map(roadmap => <div key={roadmap.id} className="flex items-center gap-3">
              <img src={roadmap.image} alt={roadmap.title} className="w-12 h-12 rounded-lg object-cover" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-800">
                  {roadmap.title}
                </h4>
                <div className="flex items-center mt-1">
                  <div className="w-24 bg-gray-200 rounded-full h-1.5 mr-2">
                    <div className="bg-[#504DFF] h-1.5 rounded-full" style={{
                  width: `${roadmap.progress}%`
                }}></div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {roadmap.progress}%
                  </span>
                </div>
              </div>
              <button className="text-[#504DFF] hover:text-[#403DC9] text-sm font-medium">
                {roadmap.status === 'completed' ? 'Lihat' : 'Lanjutkan'}
              </button>
            </div>)}
        </div>
      </div>
    </div>;
};