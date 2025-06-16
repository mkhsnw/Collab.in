import React from 'react';
import { StarIcon, BarChartIcon } from 'lucide-react';
interface ProjectType {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  matchPercentage: number;
  skills: string[];
  image: string;
}
interface ProjectRecommendationsProps {
  projects: ProjectType[];
}
export const ProjectRecommendations: React.FC<ProjectRecommendationsProps> = ({
  projects
}) => {
  return <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">
          Rekomendasi Proyek
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Berdasarkan skill yang telah kamu kuasai
        </p>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map(project => <div key={project.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-36 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                    {project.difficulty}
                  </span>
                  <div className="flex items-center">
                    <StarIcon size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-medium ml-1">
                      {project.matchPercentage}% Match
                    </span>
                  </div>
                </div>
                <h3 className="font-medium text-gray-800">{project.title}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {project.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {project.skills.map((skill, index) => <span key={index} className="text-xs bg-[#504DFF]/10 text-[#504DFF] px-2 py-0.5 rounded-full">
                      {skill}
                    </span>)}
                </div>
                <button className="mt-3 w-full bg-white border border-[#504DFF] text-[#504DFF] px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[#504DFF]/5 transition-colors">
                  Lihat Detail
                </button>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};