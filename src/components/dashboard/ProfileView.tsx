import React from "react";
import { BasicInfo } from "./BasicInfo";
import { SkillsList } from "./SkillsList";
import { OpenSourceContributions } from "./OpenSourceContributions";
import { Certificates } from "./Certificates";
import { userData } from "../../data/dashboardData";
export const ProfileView: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Profil Saya</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Basic Info and Skills */}
        <div className="lg:col-span-1 space-y-6">
          <BasicInfo user={userData} />
          <SkillsList skills={userData.skills} />
        </div>
        {/* Right column - Contributions and Certificates */}
        <div className="lg:col-span-2 space-y-6">
          <OpenSourceContributions contributions={userData.contributions} />
          <Certificates certificates={userData.certificates} />
        </div>
      </div>
    </div>
  );
};
