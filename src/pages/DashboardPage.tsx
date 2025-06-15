import React, { useState, useEffect } from "react";
// Import Components
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import HeroSection from "../components/dashboard/HeroSection";
import CategoriesSection from "../components/dashboard/CategoriesSection";
import FeaturedCoursesSection from "../components/dashboard/FeaturedCoursesSection";
import GrowSkillSection from "../components/dashboard/GrowSkillSection";
import StatsSection from "../components/dashboard/StatsSection";
import TestimonialsSection from "../components/dashboard/TestimonialsSection";
import ArticlesSection from "../components/dashboard/ArticleSection";

// Import Data
import {
  currentUser,
  categories,
  featuredCourses,
  stats,
  testimonials,
  articles,
} from "../data/dashboardData";

const DashboardPage: React.FC = () => {
  const [activeCategory, setActiveCategory] =
    useState<string>("All Categories");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle category selection
  const handleCategorySelect = (categoryName: string): void => {
    setActiveCategory(categoryName);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} />
      <HeroSection />
      <CategoriesSection
        categories={categories}
        activeCategory={activeCategory}
        onCategorySelect={handleCategorySelect}
      />
      <FeaturedCoursesSection courses={featuredCourses} />
      <GrowSkillSection />
      <StatsSection stats={stats} />
      <TestimonialsSection testimonials={testimonials} />
      <ArticlesSection articles={articles} />
      <Footer />
    </div>
  );
};

export default DashboardPage;
