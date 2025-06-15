import React from "react";
import { Star, Users, Clock } from "lucide-react";
import type { Course } from "../../types";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group hover:-translate-y-2">
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full">
            {course.level}
          </span>
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
          <button className="bg-[#584DFF] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
