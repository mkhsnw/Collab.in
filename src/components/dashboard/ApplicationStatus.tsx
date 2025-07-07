import React from "react";
import {
  CheckCircleIcon,
  ClockIcon,
  AlertCircleIcon,
  BellIcon,
} from "lucide-react";
interface ApplicationType {
  id: number;
  project: string;
  status: string;
  date: string;
  message: string;
  unread: boolean;
}
interface ApplicationStatusProps {
  applications: ApplicationType[];
}
export const ApplicationStatus: React.FC<ApplicationStatusProps> = ({
  applications,
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Accepted":
        return <CheckCircleIcon size={16} className="text-green-500" />;
      case "On Review":
        return <ClockIcon size={16} className="text-yellow-500" />;
      case "Need Revision":
        return <AlertCircleIcon size={16} className="text-orange-500" />;
      default:
        return <ClockIcon size={16} className="text-gray-500" />;
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full">
      <div className="p-5 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Application</h2>
        <div className="relative">
          <BellIcon size={20} className="text-gray-500" />
          {applications.some((app) => app.unread) && (
            <span className="absolute -top-1 -right-1 bg-[#504DFF] w-2 h-2 rounded-full"></span>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className={`p-3 rounded-lg border ${
                app.unread
                  ? "bg-[#504DFF]/5 border-[#504DFF]/20"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-800">{app.project}</h3>
                <span className="text-xs text-gray-500">{app.date}</span>
              </div>
              <div className="mt-2 flex items-center">
                {getStatusIcon(app.status)}
                <span
                  className={`ml-1.5 text-sm ${
                    app.status === "Diterima"
                      ? "text-green-600"
                      : app.status === "Dalam Review"
                      ? "text-yellow-600"
                      : app.status === "Butuh Revisi"
                      ? "text-orange-600"
                      : "text-gray-600"
                  }`}
                >
                  {app.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{app.message}</p>
              <div className="mt-3 text-right">
                <button className="text-[#504DFF] text-sm font-medium hover:underline">
                  Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
