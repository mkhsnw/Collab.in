import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/collabin_logo-removebg-preview.png"
                width={150}
                height={150}
                alt="Collabin-logo"
              />
            </div>
            <p className="text-black">
              Build skills with our comprehensive online courses and advance
              your career.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-black">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-[#584DFF] transition-colors text-black"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#584DFF] transition-colors text-black"
                >
                  Courses
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#584DFF] transition-colors text-black"
                >
                  Instructors
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#584DFF] transition-colors text-black"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-black">Categories</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-[#584DFF] transition-colors text-black"
                >
                  Development
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#584DFF] transition-colors text-black"
                >
                  Design
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#584DFF] transition-colors text-black"
                >
                  Business
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#584DFF] transition-colors text-black"
                >
                  Marketing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-black">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-[#584DFF] transition-colors text-black"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#584DFF] transition-colors text-black"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#584DFF] transition-colors text-black"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#584DFF] transition-colors text-black"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-black">
          <p>&copy; 2024 Collab.In. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
