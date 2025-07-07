import React from 'react';
import { BadgeCheckIcon, PlusIcon } from 'lucide-react';
interface SkillType {
  name: string;
  level: number;
  verified: boolean;
}
interface SkillsListProps {
  skills: SkillType[];
}
export const SkillsList: React.FC<SkillsListProps> = ({
  skills
}) => {
  return <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Skill</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <PlusIcon size={18} />
        </button>
      </div>
      <div className="p-5">
        <div className="space-y-4">
          {skills.map((skill, index) => <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {skill.name}
                  </span>
                  {skill.verified && <BadgeCheckIcon size={16} className="ml-1 text-[#504DFF]" />}
                </div>
                <span className="text-xs text-gray-500">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className={`h-1.5 rounded-full ${skill.verified ? 'bg-[#504DFF]' : 'bg-gray-400'}`} style={{
              width: `${skill.level}%`
            }}></div>
              </div>
            </div>)}
        </div>
        <button className="mt-5 w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
          Add Skill
        </button>
      </div>
    </div>;
};