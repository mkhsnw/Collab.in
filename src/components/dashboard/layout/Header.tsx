import React from "react";
import { BellIcon, MenuIcon, SearchIcon } from "lucide-react";
interface HeaderProps {
  openMobileSidebar: () => void;
}
export const Header: React.FC<HeaderProps> = ({ openMobileSidebar }) => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={openMobileSidebar}
          className="mr-4 md:hidden focus:outline-none"
        >
          <MenuIcon size={24} className="text-gray-600" />
        </button>
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search for a specialty or project..."
            className="bg-gray-100 pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#504DFF] w-64"
          />
          <SearchIcon
            size={18}
            className="absolute left-3 top-2.5 text-gray-500"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <BellIcon size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 bg-[#504DFF] w-2 h-2 rounded-full"></span>
        </button>
        <div className="flex items-center">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};
