import React, { useState } from "react";
import { Header } from "../components/dashboard/layout/Header";
import { Sidebar } from "../components/dashboard/layout/Sidebar";
import { DashboardView } from "../components/dashboard/DashboardView";
import { ProfileView } from "../components/dashboard/ProfileView";
import { RoadmapsView } from "../components/dashboard/RoadmapsView";

const DashboardPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState<boolean>(false);

  const openMobileSidebar = () => {
    setIsMobileSidebarOpen(true);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardView />;
      case "profile":
        return <ProfileView />;
      case "roadmaps":
        return <RoadmapsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0`}
      >
        <Sidebar
          currentView={currentView}
          setCurrentView={setCurrentView}
          closeMobileSidebar={closeMobileSidebar}
        />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header openMobileSidebar={openMobileSidebar} />

        {/* Main Content Area */}
        <main className="flex-1 p-6">{renderCurrentView()}</main>
      </div>
    </div>
  );
};

export default DashboardPage;
