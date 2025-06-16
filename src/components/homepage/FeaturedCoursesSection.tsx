import React from "react";
import type { Course } from "../../types";
import CourseCard from "./CourseCard";

interface FeaturedCoursesSectionProps {
  courses: Course[];
}

const FeaturedCoursesSection: React.FC<FeaturedCoursesSectionProps> = ({
  courses,
}) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Featured Courses
            </h2>
            <p className="text-gray-600">
              Discover our most popular and highly-rated courses
            </p>
          </div>
          <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-50 transition-colors duration-200 font-medium">
            All Courses
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;
