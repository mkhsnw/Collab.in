import React from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GrowSkillSection: React.FC = () => {
  const features = [
    "Certification",
    "Online Classes",
    "Expert Instructors",
    "Lifetime Access",
  ];

  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Illustration */}
          <div className="relative">
            <div className="w-full h-96  rounded-2xl flex items-center justify-center">
              <img
                src="/assets/Vector.svg"
                alt="Grow Your Skill Illustration"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
              Grow Us Your Skill
              <br />
              <span className="text-[#584DFF]">With LearnPress LMS</span>
            </h2>

            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              We denounce with righteous indignation and dislike men who are so
              beguiled and demoralized that cannot trouble.
            </p>

            {/* Features list */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              className="bg-[#584DFF] hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              onClick={() => navigate("/courses")}
            >
              Explorer Course
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowSkillSection;
