import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import type { User } from "../../types";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  currentUser: User;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const toggleSearch = (): void => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/collabin.png"
              alt="LearnPress Logo"
              className="h-40 w-auto"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate("/home")}
              className="text-gray-700 hover:text-[#584DFF] font-medium transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/courses")}
              className="text-gray-700 hover:text-[#584DFF] font-medium transition-colors"
            >
              Courses
            </button>
            <button
              onClick={() => navigate("/projects")}
              className="text-gray-700 hover:text-[#584DFF] font-medium transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => navigate("/about")}
              className="text-gray-700 hover:text-[#584DFF] font-medium transition-colors"
            >
              About
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="text-gray-700 hover:text-[#584DFF] font-medium transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Right side - Profile, Search, Notifications */}
          <div className="flex items-center space-x-4">
            {/* Profile Section */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                <button onClick={() => navigate("/dashboard")}>
                  {" "}
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to default avatar if image fails
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236B7280'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
                    }}
                  />
                </button>
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-800">
                  {currentUser.name}
                </p>
              </div>
            </div>

            {/* Search Button and Expandable Search */}
            <div className="relative">
              {isSearchOpen ? (
                // Expanded search input
                <div className="flex items-center">
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#584DFF] focus:border-transparent transition-all duration-200"
                      autoFocus
                      onBlur={() => setIsSearchOpen(false)}
                    />
                  </div>
                  <button
                    onClick={toggleSearch}
                    className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                // Search button
                <button
                  onClick={toggleSearch}
                  className="text-[#584DFF] border-1 rounded-full hover:text-gray-800 transition-colors p-2 hover:bg-gray-100"
                  aria-label="Open search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Notifications */}
            {/* <div className="relative">
                    <button
                      className="text-gray-600 hover:text-gray-800 transition-colors p-2 hover:bg-gray-100 rounded-lg relative"
                      aria-label="Notifications"
                    >
                      <Bell className="w-5 h-5" />
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">3</span>
                      </span>
                    </button>
                  </div> */}

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-600 hover:text-gray-800 p-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {/* Mobile Profile */}
            <div className="flex items-center space-x-3 px-4 py-3 border-b border-gray-100 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236B7280'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {currentUser.name}
                </p>
                <p className="text-xs text-gray-500">{currentUser.email}</p>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="px-4 mb-4">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-4 px-4">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
              >
                Courses
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
              >
                Contact
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
              >
                Profile Settings
              </a>
              <a
                href="#"
                className="text-red-600 hover:text-red-700 font-medium py-2"
              >
                Logout
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
