import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  StarIcon as StarIconSolid,
  PlayCircleIcon,
} from "@heroicons/react/24/solid";
import {
  ClockIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  ShareIcon,
  HeartIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { getCurrentUser, featuredCourses } from "../data/dashboardData";
import type { User, Course } from "../types";

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);

  const course = useMemo(() => {
    return featuredCourses.find((c) => c.id === parseInt(id || "0"));
  }, [id]);

  useEffect(() => {
    setCurrentUser(getCurrentUser());

    if (course) {
      const enrolledCourses: number[] = JSON.parse(
        localStorage.getItem("enrolledCourses") || "[]"
      );
      if (enrolledCourses.includes(course.id)) {
        setIsEnrolled(true);
      }
    }
  }, [id, course]);

  const handleAddToCart = () => {
    if (!course) return;
    const cartItems: Course[] = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );
    const isAlreadyInCart = cartItems.some((item) => item.id === course.id);

    if (!isAlreadyInCart) {
      const updatedCart = [...cartItems, course];
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      alert(`${course.title} has been added to your cart.`);
    } else {
      alert(`${course.title} is already in your cart.`);
    }
    navigate("/cart");
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header currentUser={currentUser} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Course Not Found
          </h1>
          <button
            onClick={() => navigate("/courses")}
            className="bg-[#584DFF] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Back to Courses
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const instructor = {
    name: course.instructor,
    title: "Senior Developer & Instructor",
    avatar: "/assets/profile.png",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} />

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => navigate("/courses")}
              className="text-gray-500 hover:text-gray-700 flex items-center"
            >
              <ChevronLeftIcon className="w-4 h-4 mr-1" />
              Back to Courses
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{course.title}</span>
          </div>
        </div>
      </div>

      <div className="bg-[#584DFF] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {course.category}
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-6 leading-tight">
                {course.title}
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Master the fundamentals and advanced concepts in this
                comprehensive course.
              </p>
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center">
                  <StarIconSolid className="w-5 h-5 text-yellow-400 mr-2" />
                  <span className="text-lg font-semibold">{course.rating}</span>
                  <span className="text-blue-100 ml-2">
                    ({course.students.toLocaleString()} students)
                  </span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-5 h-5 text-blue-200 mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <GlobeAltIcon className="w-5 h-5 text-blue-200 mr-2" />
                  <span>English</span>
                </div>
                <div className="flex items-center">
                  <AcademicCapIcon className="w-5 h-5 text-blue-200 mr-2" />
                  <span>Certificate</span>
                </div>
              </div>
              <div className="flex items-center">
                <img
                  src={instructor.avatar}
                  alt={instructor.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">Created by {instructor.name}</p>
                  <p className="text-blue-100 text-sm">{instructor.title}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-xl text-gray-800 sticky top-8">
                <div className="aspect-video bg-gray-200 rounded-lg mb-6 relative overflow-hidden group">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircleIcon className="w-16 h-16 text-white" />
                  </div>
                </div>
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-gray-800">
                      {course.price}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {course.originalPrice}
                    </span>
                  </div>
                  <p className="text-sm text-green-600 font-medium">Save 57%</p>
                </div>

                {!isEnrolled ? (
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-[#584DFF] text-white py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all duration-200 mb-4"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/video/${course.id}`)}
                    className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-lg mb-4 hover:bg-green-700 transition-colors"
                  >
                    Continue Learning
                  </button>
                )}

                <div className="flex space-x-2 mb-6">
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                    <HeartIcon className="w-4 h-4 mr-2" />
                    Wishlist
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                    <ShareIcon className="w-4 h-4 mr-2" />
                    Share
                  </button>
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

export default CourseDetailPage;
