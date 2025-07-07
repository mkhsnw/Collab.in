import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FolderKanban,
  Award,
  Download,
  Share2,
  Eye,
  Plus,
  ExternalLink,
  CheckCircle,
  Trophy,
} from "lucide-react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { currentUser, featuredCourses } from "../data/dashboardData";

// Types
type Certificate = {
  id: string;
  courseName: string;
  courseId: number;
  completionDate: string;
  instructor: string;
  duration: string;
  skills: string[];
  certificateUrl: string;
};

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  projectUrl: string;
  githubUrl: string;
  completionDate: string;
};

const PortfolioPage: React.FC = () => {
  const { courseId } = useParams<{ courseId?: string }>();
  const navigate = useNavigate();

  const [showNewCertificate, setShowNewCertificate] = useState<boolean>(false);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // Mock certificates data
  const mockCertificates: Certificate[] = [
    {
      id: "1",
      courseName: "Full-Stack Web Developer",
      courseId: 1,
      completionDate: "31 Mei 2025",
      instructor: "Sarah Wilson",
      duration: "120 jam",
      skills: ["React", "Node.js", "JavaScript", "HTML/CSS"],
      certificateUrl: "#",
    },
  ];

  // Mock projects data
  const mockProjects: Project[] = [
    {
      id: "1",
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce application built with React and Node.js",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      imageUrl:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop",
      projectUrl: "https://example-ecommerce.com",
      githubUrl: "https://github.com/user/ecommerce",
      completionDate: "20 Mei 2025",
    },
  ];

  useEffect(() => {
    setCertificates(mockCertificates);
    setProjects(mockProjects);

    // Show new certificate modal if coming from course completion
    if (courseId) {
      setShowNewCertificate(true);
    }
  }, [courseId]);

  const handleDownloadCertificate = (certificate: Certificate) => {
    // Implementation for downloading certificate
    console.log("Downloading certificate:", certificate.id);
  };

  const handleShareCertificate = (certificate: Certificate) => {
    // Implementation for sharing certificate
    console.log("Sharing certificate:", certificate.id);
  };

  const getCompletedCourse = () => {
    if (courseId) {
      return featuredCourses.find((course) => course.id === parseInt(courseId));
    }
    return null;
  };

  const completedCourse = getCompletedCourse();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} />

      {/* Success Banner for Course Completion */}
      {showNewCertificate && completedCourse && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-4">
              <Trophy className="w-12 h-12 text-yellow-300" />
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">
                  🎉 Selamat! Kursus Selesai!
                </h1>
                <p className="text-lg text-green-100">
                  Anda telah berhasil menyelesaikan "{completedCourse.title}"
                </p>
                <p className="text-sm text-green-200 mt-1">
                  Sertifikat Anda sudah siap untuk diunduh
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            My Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Showcase your achievements, projects, and certificates to stand out
            to recruiters
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Portfolio Projects Column */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <FolderKanban className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Portfolio</h2>
                <p className="text-gray-500 mt-1">
                  Show your results and achievements here.
                </p>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              Add Projects or Skills to attract recruiters' attention.
            </p>

            {/* Existing Projects */}
            {projects.length > 0 && (
              <div className="mb-6 space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex space-x-3">
                          <a
                            href={project.projectUrl}
                            className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </a>
                          <a
                            href={project.githubUrl}
                            className="text-sm text-gray-600 hover:text-gray-700 flex items-center"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            GitHub
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add Project Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">Project</h3>
              <p className="text-sm text-gray-600 mb-4">
                Work or case studies you have created
              </p>
              <button className="w-full bg-[#504DFF] text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center">
                <Plus className="w-5 h-5 mr-2" />
                Add Project
              </button>
            </div>
          </div>

          {/* Certificates Column */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Sertifikat</h2>
                <p className="text-gray-500 mt-1">
                  Congratulations, you have completed the class!
                </p>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              Use this certificate to advance your career.
            </p>

            {/* Certificate List */}
            <div className="space-y-6">
              {certificates.map((certificate) => (
                <div key={certificate.id} className="relative">
                  {/* Highlight new certificate */}
                  {showNewCertificate &&
                    certificate.courseId.toString() === courseId && (
                      <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg opacity-75 animate-pulse"></div>
                    )}

                  <div className="relative bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300">
                    {certificate.courseId.toString() === courseId && (
                      <div className="absolute top-2 right-2">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Baru
                        </span>
                      </div>
                    )}

                    <div className="text-center">
                      <h4 className="text-sm font-semibold tracking-widest text-gray-500 mb-4">
                        SERTIFIKAT TERVERIFIKASI
                      </h4>
                      <p className="text-xs text-gray-500">Diberikan Kepada</p>
                      <p className="text-2xl font-bold text-gray-800 my-2">
                        {currentUser.name}
                      </p>
                      <p className="text-sm text-gray-600 max-w-xs mx-auto mb-4">
                        telah menyelesaikan kelas "{certificate.courseName}"
                        yang diselenggarakan oleh Collab.in
                      </p>

                      <div className="flex justify-between items-center mb-4">
                        <div className="text-left">
                          <p className="text-xs text-gray-500">
                            Tanggal Selesai
                          </p>
                          <p className="text-sm font-medium text-gray-700">
                            {certificate.completionDate}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-600">
                            Collab.in
                          </p>
                        </div>
                      </div>

                      {/* Skills earned */}
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-2">
                          Skills yang dikuasai:
                        </p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {certificate.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Certificate Actions */}
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => handleDownloadCertificate(certificate)}
                        className="flex-1 bg-[#504DFF] text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center text-sm"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Donwload
                      </button>
                      <button
                        onClick={() => handleShareCertificate(certificate)}
                        className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center text-sm"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Learning CTA */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-800 mb-2">
                Continue Learning
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Earn more certificates by taking other courses
              </p>
              <button
                onClick={() => navigate("/courses")}
                className="w-full bg-[#504DFF] text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm"
              >
                Explore other courses
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {certificates.length}
            </h3>
            <p className="text-gray-600">Sertifikat Diperoleh</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FolderKanban className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {projects.length}
            </h3>
            <p className="text-gray-600">Proyek Selesai</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {certificates.reduce(
                (total, cert) => total + cert.skills.length,
                0
              )}
            </h3>
            <p className="text-gray-600">Skills Dikuasai</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
