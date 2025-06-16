import React from 'react';
import { GitPullRequestIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';
interface ContributionType {
  project: string;
  title: string;
  prLink: string;
  date: string;
  status: string;
}
interface OpenSourceContributionsProps {
  contributions: ContributionType[];
}
export const OpenSourceContributions: React.FC<OpenSourceContributionsProps> = ({
  contributions
}) => {
  return <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">
          Kontribusi Open Source
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Pull request yang telah dibuat
        </p>
      </div>
      <div className="p-5">
        {contributions.length > 0 ? <div className="space-y-4">
            {contributions.map((contribution, index) => <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <GitPullRequestIcon size={18} className={`${contribution.status === 'Merged' ? 'text-purple-600' : contribution.status === 'In Review' ? 'text-yellow-600' : 'text-gray-600'}`} />
                    <span className="ml-2 text-sm font-medium text-gray-800">
                      {contribution.project}
                    </span>
                  </div>
                  <div className="flex items-center">
                    {contribution.status === 'Merged' ? <CheckCircleIcon size={16} className="text-green-500 mr-1" /> : <ClockIcon size={16} className="text-yellow-500 mr-1" />}
                    <span className={`text-xs ${contribution.status === 'Merged' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {contribution.status}
                    </span>
                  </div>
                </div>
                <h3 className="mt-2 text-base font-medium">
                  {contribution.title}
                </h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {contribution.date}
                  </span>
                  <a href={contribution.prLink} target="_blank" rel="noopener noreferrer" className="text-[#504DFF] text-sm font-medium hover:underline">
                    Lihat PR
                  </a>
                </div>
              </div>)}
          </div> : <div className="text-center py-8">
            <GitPullRequestIcon size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-gray-700">
              Belum ada kontribusi
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Mulai berkontribusi ke proyek open source
            </p>
            <button className="mt-4 bg-[#504DFF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#403DC9] transition-colors">
              Temukan Proyek
            </button>
          </div>}
      </div>
    </div>;
};