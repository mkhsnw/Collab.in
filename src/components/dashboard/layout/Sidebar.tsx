import React from "react";
import {
  Squares2X2Icon,
  UserIcon,
  MapIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  closeMobileSidebar: () => void;
}
export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setCurrentView,
  closeMobileSidebar,
}) => {
  const handleNavigation = (view: string) => {
    setCurrentView(view);
    closeMobileSidebar();
  };

  const navigate = useNavigate();
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Squares2X2Icon />,
    },
    {
      id: "profile",
      label: "My Profile",
      icon: <UserIcon />,
    },
    {
      id: "roadmaps",
      label: "Learning Path",
      icon: <MapIcon />,
    },
  ];
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-center p-4">
        <button onClick={() => navigate("/home")}>
          <img
            src="/collabin.png"
            alt="Logo"
            className="max-w-full h-auto max-h-20 object-contain"
          />
        </button>
      </div>
      <div className="flex-1 py-4">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg ${
                currentView === item.id
                  ? "bg-[#504DFF]/10 text-[#504DFF]"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span
                className={`${
                  currentView === item.id ? "text-[#504DFF]" : "text-gray-500"
                }`}
              >
                {item.icon}
              </span>
              <span className="ml-3">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t">
        <button
          className="w-full flex items-center px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
          onClick={() => navigate("/home")}
        >
          <ArrowLeftOnRectangleIcon className="text-gray-500 size-6" />
          <span className="ml-3">Exit</span>
        </button>
      </div>
    </div>
  );
};
