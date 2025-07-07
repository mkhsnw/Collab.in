import React, { useState, useEffect, useRef } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  Squares2X2Icon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import type { User as UserType } from "../../types";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  currentUser?: UserType; // Dibuat opsional untuk menangani status logout
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] =
    useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = (): void => {
    // Logika untuk logout, misalnya menghapus token atau state user
    // Setelah logout, arahkan ke halaman home
    localStorage.removeItem("currentUser");
    // Refresh halaman untuk memastikan state di seluruh aplikasi diperbarui
    navigate("/home");
  };

  // Menutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigate("/home")}
          >
            <img
              src="/collabin.png"
              alt="Collab.in Logo"
              className="h-40 w-auto"
            />
          </div>

          {/* Navigasi Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigate("/home")}
              className="text-gray-700 hover:text-[#584DFF] font-medium transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigate("/courses")}
              className="text-gray-700 hover:text-[#584DFF] font-medium transition-colors"
            >
              Courses
            </button>
            <button
              onClick={() => handleNavigate("/projects")}
              className="text-gray-700 hover:text-[#584DFF] font-medium transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => handleNavigate("/discussion")}
              className="text-gray-700 hover:text-[#584DFF] font-medium transition-colors"
            >
              Forum
            </button>
          </nav>

          {/* Bagian Kanan - Ikon & Profil / Tombol Login */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {currentUser ? (
              // --- TAMPILAN JIKA SUDAH LOGIN ---
              <>
                <button
                  onClick={() => handleNavigate("/cart")}
                  className="text-gray-600 hover:text-[#584DFF] p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Shopping Cart"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                </button>
                <div className="relative hidden md:block" ref={dropdownRef}>
                  <button
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                    className="flex items-center space-x-3 focus:outline-none"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-[#584DFF] transition">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-semibold text-gray-900">
                          {currentUser.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {currentUser.email}
                        </p>
                      </div>
                      <button
                        onClick={() => handleNavigate("/dashboard")}
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#584DFF]"
                      >
                        <Squares2X2Icon className="w-4 h-4 mr-3" />
                        Dashboard
                      </button>
                      <button
                        onClick={() => handleNavigate("/profile")}
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#584DFF]"
                      >
                        <UserIcon className="w-4 h-4 mr-3" />
                        My Profile
                      </button>
                      <div className="border-t my-2"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // --- TAMPILAN JIKA BELUM LOGIN ---
              <div className="hidden md:flex items-center space-x-2">
                <button
                  onClick={() => handleNavigate("/login")}
                  className="text-white bg-[#584DFF] hover:bg-blue-600 font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Login
                </button>
              </div>
            )}

            {/* Tombol Menu Mobile */}
            <button
              className="md:hidden text-gray-600 hover:text-gray-800 p-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {currentUser && (
              <div className="flex items-center space-x-3 px-4 py-3 border-b border-gray-100 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {currentUser.name}
                  </p>
                  <p className="text-xs text-gray-500">{currentUser.email}</p>
                </div>
              </div>
            )}

            {/* Navigasi Mobile */}
            <nav className="flex flex-col space-y-1 px-2">
              <button
                onClick={() => handleNavigate("/home")}
                className="text-gray-700 hover:bg-gray-100 font-medium py-2 px-2 rounded-md text-left"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigate("/courses")}
                className="text-gray-700 hover:bg-gray-100 font-medium py-2 px-2 rounded-md text-left"
              >
                Courses
              </button>
              <button
                onClick={() => handleNavigate("/projects")}
                className="text-gray-700 hover:bg-gray-100 font-medium py-2 px-2 rounded-md text-left"
              >
                Projects
              </button>
              <button
                onClick={() => handleNavigate("/forum")}
                className="text-gray-700 hover:bg-gray-100 font-medium py-2 px-2 rounded-md text-left"
              >
                Forum
              </button>
              <div className="border-t my-2"></div>
              {currentUser ? (
                <>
                  <button
                    onClick={() => handleNavigate("/dashboard")}
                    className="text-gray-700 hover:bg-gray-100 font-medium py-2 px-2 rounded-md text-left"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => handleNavigate("/profile")}
                    className="text-gray-700 hover:bg-gray-100 font-medium py-2 px-2 rounded-md text-left"
                  >
                    Profil Saya
                  </button>
                  <button
                    onClick={() => handleNavigate("/settings")}
                    className="text-gray-700 hover:bg-gray-100 font-medium py-2 px-2 rounded-md text-left"
                  >
                    Pengaturan
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:bg-red-50 font-medium py-2 px-2 rounded-md text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavigate("/login")}
                    className="text-gray-700 hover:bg-gray-100 font-medium py-2 px-2 rounded-md text-left"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavigate("/register")}
                    className="text-gray-700 hover:bg-gray-100 font-medium py-2 px-2 rounded-md text-left"
                  >
                    Register
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
