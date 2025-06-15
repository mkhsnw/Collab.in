import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-[url(/assets/banner.png)] text-white py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6 leading-tight text-black">
              Build Skills With Online Course
            </h1>
            <p className="text-xl mb-8 text-black">
              We provide the best online courses to help you achieve your goals
              and advance your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#584DFF] text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 hover:text-blue-600  transition-colors">
                Explore Courses
              </button>
              <button className="bg-[#584DFF] border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
