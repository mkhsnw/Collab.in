import React from "react";
import {
  Squares2X2Icon,
  UserIcon,
  MapIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
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
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Squares2X2Icon />,
    },
    {
      id: "profile",
      label: "Profil Saya",
      icon: <UserIcon />,
    },
    {
      id: "roadmaps",
      label: "Jalur Belajar",
      icon: <MapIcon />,
    },
  ];
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-center p-4">
        <a href="/home">
          <img
            src="/collabin.png"
            alt="Logo"
            className="max-w-full h-auto max-h-20 object-contain"
          />
        </a>
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
          onClick={() => (window.location.href = "/home")}
        >
          <ArrowLeftOnRectangleIcon className="text-gray-500 size-6" />
          <span className="ml-3">Keluar</span>
        </button>
      </div>
    </div>
  );
};
