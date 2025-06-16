import React from 'react';
import { LearningProgress } from './LearningProgress';
import { ProjectRecommendations } from './ProjectRecommendations';
import { ApplicationStatus } from './ApplicationStatus';
import { roadmapsData, projectRecommendations, applicationStatus } from '../../data/dashboardData';
export const DashboardView: React.FC = () => {
  return <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Learning Progress */}
        <div className="lg:col-span-2">
          <LearningProgress roadmaps={roadmapsData} />
        </div>
        {/* Right column - Application Status */}
        <div>
          <ApplicationStatus applications={applicationStatus} />
        </div>
      </div>
      {/* Project Recommendations */}
      <div>
        <ProjectRecommendations projects={projectRecommendations} />
      </div>
    </div>;
};