import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Clock, 
  Globe, 
  Award, 
  PlayCircle,  
  Share2, 
  Heart, 
  ChevronLeft,
  Check,
  User,
} from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { currentUser, featuredCourses } from '../data/dashboardData';
// import type { Course } from '../types';

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);

  // Find the course by ID
  const course = useMemo(() => {
    return featuredCourses.find(c => c.id === parseInt(id || '0'));
  }, [id]);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header currentUser={currentUser} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h1>
            <p className="text-gray-600 mb-8">The course you're looking for doesn't exist.</p>
            <button 
              onClick={() => navigate('/courses')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Courses
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const courseModules = [
    { title: "Introduction to the Course", duration: "15 min", completed: true },
    { title: "Setting Up Your Development Environment", duration: "30 min", completed: true },
    { title: "Basic Concepts and Fundamentals", duration: "45 min", completed: false },
    { title: "Hands-on Project #1", duration: "60 min", completed: false },
    { title: "Advanced Techniques", duration: "50 min", completed: false },
    { title: "Real-world Applications", duration: "40 min", completed: false },
    { title: "Final Project", duration: "90 min", completed: false },
  ];

  const instructor = {
    name: course.instructor,
    title: "Senior Developer & Instructor",
    bio: "Experienced developer with 10+ years in the industry. Passionate about teaching and helping students achieve their goals.",
    students: "50K+",
    courses: "15",
    rating: 4.8,
    avatar: "/assets/profile.png"
  };

  const reviews = [
    {
      name: "Alex Johnson",
      rating: 5,
      comment: "Excellent course! Very well structured and easy to follow.",
      date: "2 weeks ago"
    },
    {
      name: "Maria Garcia",
      rating: 5,
      comment: "This course helped me land my dream job. Highly recommended!",
      date: "1 month ago"
    },
    {
      name: "David Lee",
      rating: 4,
      comment: "Good content, but could use more practical examples.",
      date: "1 month ago"
    }
  ];

  const handleEnroll = () => {
    setIsEnrolled(true);
    // Add enrollment logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <button 
              onClick={() => navigate('/courses')}
              className="text-gray-500 hover:text-gray-700 flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Courses
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{course.title}</span>
          </div>
        </div>
      </div>

      {/* Course Header */}
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
                Master the fundamentals and advanced concepts in this comprehensive course 
                designed for both beginners and experienced learners.
              </p>
              
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-2" />
                  <span className="text-lg font-semibold">{course.rating}</span>
                  <span className="text-blue-100 ml-2">({course.students.toLocaleString()} students)</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-200 mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-blue-200 mr-2" />
                  <span>English</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-blue-200 mr-2" />
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

            {/* Course Preview Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-xl text-gray-800 sticky top-8">
                <div className="aspect-video bg-gray-200 rounded-lg mb-6 relative overflow-hidden">
                  <img 
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <PlayCircle className="w-16 h-16 text-white" />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-gray-800">{course.price}</span>
                    <span className="text-lg text-gray-500 line-through">{course.originalPrice}</span>
                  </div>
                  <p className="text-sm text-green-600 font-medium">Save 57%</p>
                </div>

                {!isEnrolled ? (
                  <button 
                    onClick={handleEnroll}
                    className="w-full bg-[#584DFF] text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-all duration-200 mb-4"
                  >
                    Enroll Now
                  </button>
                ) : (
                  <button className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-lg mb-4">
                    Continue Learning
                  </button>
                )}

                <div className="flex space-x-2 mb-6">
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                    <Heart className="w-4 h-4 mr-2" />
                    Wishlist
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </button>
                </div>

                {/* <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Students</span>
                    <span className="font-semibold">{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Level</span>
                    <span className="font-semibold">{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Language</span>
                    <span className="font-semibold">English</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
              <div className="border-b">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'curriculum', label: 'Curriculum' },
                    { id: 'instructor', label: 'Instructor' },
                    { id: 'reviews', label: 'Reviews' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">What you'll learn</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          "Master the fundamentals of the subject",
                          "Build real-world projects from scratch",
                          "Learn industry best practices",
                          "Get hands-on experience",
                          "Understand advanced concepts",
                          "Prepare for job interviews"
                        ].map((item, index) => (
                          <div key={index} className="flex items-start">
                            <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Course Description</h3>
                      <div className="prose max-w-none text-gray-700">
                        <p className="mb-4">
                          This comprehensive course is designed to take you from beginner to advanced level. 
                          Whether you're just starting out or looking to enhance your existing skills, 
                          this course provides everything you need to succeed.
                        </p>
                        <p className="mb-4">
                          You'll learn through hands-on projects, real-world examples, and practical exercises 
                          that will help you build a strong foundation and develop the confidence to tackle 
                          complex challenges.
                        </p>
                        <p>
                          By the end of this course, you'll have the skills and knowledge needed to excel 
                          in your field and advance your career.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Basic computer knowledge</li>
                        <li>• No prior experience required</li>
                        <li>• Enthusiasm to learn</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-6">Course Curriculum</h3>
                    <div className="space-y-4">
                      {courseModules.map((module, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg">
                          <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`w-6 h-6 rounded-full mr-4 flex items-center justify-center ${
                                module.completed ? 'bg-green-600' : 'bg-gray-300'
                              }`}>
                                {module.completed ? (
                                  <Check className="w-4 h-4 text-white" />
                                ) : (
                                  <span className="text-xs text-gray-600">{index + 1}</span>
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-800">{module.title}</h4>
                                <p className="text-sm text-gray-500">{module.duration}</p>
                              </div>
                            </div>
                            <PlayCircle className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'instructor' && (
                  <div>
                    <div className="flex items-start space-x-6">
                      <img 
                        src={instructor.avatar}
                        alt={instructor.name}
                        className="w-24 h-24 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{instructor.name}</h3>
                        <p className="text-gray-600 mb-4">{instructor.title}</p>
                        
                        <div className="grid grid-cols-3 gap-6 mb-6">
                          <div className="text-center">
                            <div className="font-semibold text-lg">{instructor.rating}</div>
                            <div className="text-sm text-gray-500">Rating</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-lg">{instructor.students}</div>
                            <div className="text-sm text-gray-500">Students</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-lg">{instructor.courses}</div>
                            <div className="text-sm text-gray-500">Courses</div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700">{instructor.bio}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold">Student Reviews</h3>
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 mr-1" />
                        <span className="font-semibold">{course.rating}</span>
                        <span className="text-gray-500 ml-2">({course.students.toLocaleString()} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {reviews.map((review, index) => (
                        <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                          <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{review.name}</h4>
                                <div className="flex items-center">
                                  <div className="flex mr-2">
                                    {[...Array(review.rating)].map((_, i) => (
                                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-500">{review.date}</span>
                                </div>
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Related Courses Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-semibold mb-4">Related Courses</h3>
              <div className="space-y-4">
                {featuredCourses
                  .filter(c => c.id !== course.id && c.category === course.category)
                  .slice(0, 3)
                  .map((relatedCourse) => (
                    <div 
                      key={relatedCourse.id}
                      onClick={() => navigate(`/course/${relatedCourse.id}`)}
                      className="flex space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <img 
                        src={relatedCourse.image}
                        alt={relatedCourse.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">
                          {relatedCourse.title}
                        </h4>
                        <p className="text-xs text-gray-500">{relatedCourse.instructor}</p>
                        <div className="flex items-center mt-1">
                          <Star className="w-3 h-3 text-yellow-400 mr-1" />
                          <span className="text-xs text-gray-600">{relatedCourse.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
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