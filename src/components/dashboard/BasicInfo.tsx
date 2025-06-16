import React from 'react';
import { UserIcon, PencilIcon } from 'lucide-react';
interface UserType {
  name: string;
  photo: string;
  bio: string;
  status: string;
}
interface BasicInfoProps {
  user: UserType;
}
export const BasicInfo: React.FC<BasicInfoProps> = ({
  user
}) => {
  return <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Info Dasar</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <PencilIcon size={18} />
        </button>
      </div>
      <div className="p-5">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img src={user.photo} alt={user.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow" />
            <button className="absolute bottom-0 right-0 bg-[#504DFF] text-white p-1 rounded-full">
              <PencilIcon size={14} />
            </button>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            {user.name}
          </h3>
          <div className="mt-1 px-3 py-1 bg-[#504DFF]/10 text-[#504DFF] text-xs font-medium rounded-full">
            {user.status}
          </div>
          <p className="mt-3 text-sm text-gray-600 text-center">{user.bio}</p>
          <button className="mt-5 w-full bg-[#504DFF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#403DC9] transition-colors">
            Edit Profil
          </button>
        </div>
      </div>
    </div>;
};