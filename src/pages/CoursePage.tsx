import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import CourseCard from "../components/homepage/CourseCard";
import {
  currentUser,
  featuredCourses,
  categories,
} from "../data/dashboardData";
// import type { Course } from '../types';

const CoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLevel, setSelectedLevel] = useState<string>("All Levels");
  const [selectedPrice, setSelectedPrice] = useState<string>("All Prices");
  const [sortBy, setSortBy] = useState<string>("Most Popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const coursesPerPage = 6; // Adjust based on your preference

  // Filter options
  const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
  const priceRanges = [
    "All Prices",
    "Free",
    "Under $50",
    "$50 - $100",
    "Over $100",
  ];
  const sortOptions = [
    "Most Popular",
    "Newest",
    "Price: Low to High",
    "Price: High to Low",
    "Highest Rated",
  ];

  // Filter and search courses
  const filteredCourses = useMemo(() => {
    let filtered = [...featuredCourses];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory
      );
    }

    // Level filter
    if (selectedLevel !== "All Levels") {
      filtered = filtered.filter((course) => course.level === selectedLevel);
    }

    // Price filter (simplified logic)
    if (selectedPrice !== "All Prices") {
      filtered = filtered.filter((course) => {
        const price = parseFloat(course.price.replace("$", ""));
        switch (selectedPrice) {
          case "Free":
            return price === 0;
          case "Under $50":
            return price < 50;
          case "$50 - $100":
            return price >= 50 && price <= 100;
          case "Over $100":
            return price > 100;
          default:
            return true;
        }
      });
    }

    // Sort courses
    switch (sortBy) {
      case "Newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      case "Price: Low to High":
        filtered.sort(
          (a, b) =>
            parseFloat(a.price.replace("$", "")) -
            parseFloat(b.price.replace("$", ""))
        );
        break;
      case "Price: High to Low":
        filtered.sort(
          (a, b) =>
            parseFloat(b.price.replace("$", "")) -
            parseFloat(a.price.replace("$", ""))
        );
        break;
      case "Highest Rated":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "Most Popular":
      default:
        filtered.sort((a, b) => b.students - a.students);
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedLevel, selectedPrice, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedLevel, selectedPrice, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedLevel("All Levels");
    setSelectedPrice("All Prices");
    setSortBy("Most Popular");
    setCurrentPage(1);
  };

  // Pagination component
  const Pagination: React.FC = () => {
    const getVisiblePages = () => {
      const pages = [];
      const maxVisiblePages = 5;

      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    };

    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center space-x-1 mt-8">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Numbers */}
        {getVisiblePages().map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition-colors ${
              currentPage === page
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-50 border border-gray-300"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Show dots if there are more pages */}
        {totalPages > 5 && currentPage < totalPages - 2 && (
          <span className="text-gray-400 px-2">...</span>
        )}

        {/* Next Button */}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} />

      {/* Page Header */}
      <div className="bg-[#584DFF] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Explore Our Courses</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover courses designed to build essential skills for open
              source contribution
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses, instructors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-white/90 backdrop-blur-sm border-0 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white transition-all duration-200 text-gray-800 placeholder-gray-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">
                    {filteredCourses.length} courses found
                  </span>

                  {/* Show current page info */}
                  {filteredCourses.length > 0 && (
                    <span className="text-sm text-gray-500">
                      Showing {startIndex + 1}-
                      {Math.min(endIndex, filteredCourses.length)} of{" "}
                      {filteredCourses.length}
                    </span>
                  )}

                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {sortOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${
                        viewMode === "grid"
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      } transition-colors`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${
                        viewMode === "list"
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      } transition-colors`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses Grid - Now shows paginated courses */}
            {currentCourses.length > 0 ? (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "space-y-6"
                  }
                >
                  {currentCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>

                {/* Pagination Component */}
                <Pagination />
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No courses found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          {/* Sidebar - Rest of the sidebar code remains the same */}
          <div className="lg:col-span-1">
            <div
              className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8 ${
                showFilters ? "block" : "hidden lg:block"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Category</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value="All"
                        checked={selectedCategory === "All"}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-3 text-blue-600"
                      />
                      <span className="text-gray-700">All Categories</span>
                    </label>
                    {categories.map((category) => (
                      <label key={category.name} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category.name}
                          checked={selectedCategory === category.name}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="mr-3 text-blue-600"
                        />
                        <span className="text-gray-700">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Level Filter */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Level</h4>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <label key={level} className="flex items-center">
                        <input
                          type="radio"
                          name="level"
                          value={level}
                          checked={selectedLevel === level}
                          onChange={(e) => setSelectedLevel(e.target.value)}
                          className="mr-3 text-blue-600"
                        />
                        <span className="text-gray-700">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">
                    Price Range
                  </h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range} className="flex items-center">
                        <input
                          type="radio"
                          name="price"
                          value={range}
                          checked={selectedPrice === range}
                          onChange={(e) => setSelectedPrice(e.target.value)}
                          className="mr-3 text-blue-600"
                        />
                        <span className="text-gray-700">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Popular Topics */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">
                    Popular Topics
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React",
                      "Python",
                      "JavaScript",
                      "Git",
                      "Docker",
                      "AWS",
                    ].map((topic) => (
                      <button
                        key={topic}
                        onClick={() => setSearchTerm(topic)}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CoursesPage;
