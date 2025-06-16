import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, Users, Clock, Heart, Play } from "lucide-react";
import type { Course } from "../../types";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();

  const handleCourseClick = () => {
    navigate(`/course/${course.id}`);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group hover:-translate-y-2"
      onClick={handleCourseClick}
    >
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200' fill='%23f3f4f6'%3E%3Crect width='300' height='200' fill='%23e5e7eb'/%3E%3Ctext x='150' y='100' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='Arial, sans-serif' font-size='14'%3ECourse Image%3C/text%3E%3C/svg%3E";
          }}
        />
        <div className="absolute top-4 right-4">
          <button
            className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
            aria-label="Add to favorites"
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation when clicking heart
              // Add to favorites logic here
            }}
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full">
            {course.level}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play className="w-12 h-12 text-white" />
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3">
          <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2 group-hover:text-[#584DFF] transition-colors">
            {course.title}
          </h3>
          <p className="text-gray-600 text-sm">by {course.instructor}</p>
        </div>

        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>{course.rating}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{course.students.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{course.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-800">
              {course.price}
            </span>
            <span className="text-sm text-gray-500 line-through">
              {course.originalPrice}
            </span>
          </div>
          <button
            className="bg-[#584DFF] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            onClick={(e) => {
              e.stopPropagation(); // Prevent double navigation
              handleCourseClick();
            }}
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
