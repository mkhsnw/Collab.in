import React, { useState, useMemo } from "react";
// Impor 'useNavigate' diaktifkan untuk routing
import { useNavigate } from "react-router-dom";
import {
  Play,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Footer, Header } from "../components/common";
import { currentUser } from "../data/dashboardData";

// --- DATA STRUKTUR (TIDAK BERUBAH) ---
const courseContent = [
  {
    sectionTitle: "Persiapan Project",
    lessons: [
      {
        id: "prep-1",
        title: "Instalasi & Konfigurasi Awal",
        duration: "10:15",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        sourceCode: [],
      },
    ],
  },
  {
    sectionTitle: "FrontEnd Development",
    lessons: [
      {
        id: "fe-1",
        title: "Dasar-dasar React",
        duration: "35:50",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        sourceCode: [],
      },
    ],
  },
  {
    sectionTitle: "BackEnd Development",
    lessons: [
      {
        id: "be-1",
        title: "Bahasa Pemrograman Server-side",
        duration: "45:00",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        sourceCode: [
          { name: "repo1", url: "https://github.com/example/repo1" },
          { name: "repo2", url: "https://github.com/example/repo2" },
        ],
      },
      {
        id: "be-2",
        title: "Manajemen Server & Route",
        duration: "25:20",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        sourceCode: [],
      },
      {
        id: "be-3",
        title: "API (Application Programming Interface)",
        duration: "30:00",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        sourceCode: [],
      },
      {
        id: "be-4",
        title: "Autentikasi & Otorisasi",
        duration: "35:00",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        sourceCode: [],
      },
    ],
  },
  {
    sectionTitle: "Database Management",
    lessons: [
      {
        id: "db-1",
        title: "Pengenalan SQL & NoSQL",
        duration: "40:00",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
        sourceCode: [],
      },
    ],
  },
];

const VideoCoursePage: React.FC = () => {
  const navigate = useNavigate(); // Hook untuk navigasi

  const [activeLesson, setActiveLesson] = useState({
    sectionIdx: 2,
    lessonIdx: 0,
  });

  // --- MODIFIKASI: STATE UNTUK SIMULASI SEMUA SELESAI ---
  // Untuk mencoba fitur sertifikat, Anda bisa uncomment baris kedua
  // dan comment baris pertama.
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set()
  );
  // const [completedLessons, setCompletedLessons] = useState<Set<string>>(
  //  new Set(["prep-1", "fe-1", "be-1", "be-2", "be-3", "be-4", "db-1"])
  // );

  const [openSection, setOpenSection] = useState<number>(2);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  console.log(isPlaying);

  const currentLesson = useMemo(() => {
    return courseContent[activeLesson.sectionIdx].lessons[
      activeLesson.lessonIdx
    ];
  }, [activeLesson]);

  // --- BARU: Menghitung apakah semua kursus telah selesai ---
  // useMemo digunakan agar kalkulasi ini tidak berjalan di setiap render,
  // hanya ketika `completedLessons` berubah.
  const isCourseComplete = useMemo(() => {
    const totalLessons = courseContent.reduce(
      (acc, section) => acc + section.lessons.length,
      0
    );
    // Pastikan total pelajaran lebih dari 0 dan jumlah yang selesai sama dengan totalnya.
    return totalLessons > 0 && completedLessons.size === totalLessons;
  }, [completedLessons]);

  const handleSelectLesson = (sectionIdx: number, lessonIdx: number) => {
    setActiveLesson({ sectionIdx, lessonIdx });
    setIsPlaying(false);
  };

  const markLessonAsComplete = () => {
    setCompletedLessons((prev) => new Set(prev).add(currentLesson.id));
  };

  const toggleSection = (sectionIdx: number) => {
    setOpenSection((prevOpenSection) =>
      prevOpenSection === sectionIdx ? -1 : sectionIdx
    );
  };

  // --- BARU: Fungsi untuk navigasi ke halaman portofolio ---
  const handleNavigateToPortfolio = () => {
    navigate(`/portfolio`); // Arahkan ke route '/portfolio'
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header currentUser={currentUser} />

      <main className="container mx-auto px-10 mt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Full-Stack Developer
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Kolom Kiri: Video & Kontrol */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
              <video
                ref={videoRef}
                key={currentLesson.videoUrl}
                className="w-full h-full"
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={currentLesson.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="mt-6 p-6 bg-white border border-gray-200 rounded-lg">
              <h2 className="text-xl font-bold text-gray-800">
                {courseContent[activeLesson.sectionIdx].sectionTitle}
              </h2>
              <p className="text-gray-500 mt-1">{currentLesson.title}</p>

              {currentLesson.sourceCode &&
                currentLesson.sourceCode.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-700">Source Code</h3>
                    <ul className="mt-2 space-y-1">
                      {currentLesson.sourceCode.map((link) => (
                        <li key={link.url}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            {link.url}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            <div className="mt-6 p-6 bg-white border border-gray-200 rounded-lg flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-800">
                Apakah sudah paham ?
              </h3>
              <div className="flex space-x-4">
                <button className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                  Ask Forum
                </button>
                <button
                  onClick={markLessonAsComplete}
                  className="px-5 py-2 bg-[#584DFF] text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Understand
                </button>
                {/* --- BARU: Tombol Sertifikat (Tampil Kondisional) --- */}
                {isCourseComplete && (
                  <button
                    onClick={handleNavigateToPortfolio}
                    className="px-5 py-2 bg-[#504DFF] text-white font-bold rounded-lg hover:bg-blue-600  transition-all duration-200 ease-in-out text-center shadow-lg"
                  >
                    View Certificate
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Daftar Materi */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              {courseContent.map((section, sectionIdx) => (
                <div key={sectionIdx} className="mb-2 last:mb-0">
                  <button
                    onClick={() => toggleSection(sectionIdx)}
                    className="w-full flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-md transition"
                  >
                    <h3 className="font-bold text-gray-800">
                      {section.sectionTitle}
                    </h3>
                    {openSection === sectionIdx ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>

                  {openSection === sectionIdx && (
                    <div className="mt-2 space-y-1">
                      {section.lessons.map((lesson, lessonIdx) => {
                        const isActive =
                          activeLesson.sectionIdx === sectionIdx &&
                          activeLesson.lessonIdx === lessonIdx;
                        const isCompleted = completedLessons.has(lesson.id);

                        return (
                          <div
                            key={lesson.id}
                            onClick={() =>
                              handleSelectLesson(sectionIdx, lessonIdx)
                            }
                            className={`p-3 flex items-center justify-between rounded-md cursor-pointer transition ${
                              isActive ? "bg-blue-100" : "hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center">
                              <div
                                className={`mr-3 w-6 h-6 flex items-center justify-center rounded-full ${
                                  isActive ? "bg-blue-600" : "bg-gray-300"
                                }`}
                              >
                                <Play
                                  size={14}
                                  className={`${
                                    isActive ? "text-white" : "text-gray-600"
                                  }`}
                                />
                              </div>
                              <div>
                                <p
                                  className={`font-medium ${
                                    isActive ? "text-blue-700" : "text-gray-700"
                                  }`}
                                >
                                  {lesson.title}
                                </p>
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                  <Clock size={12} className="mr-1" />
                                  <span>{lesson.duration}</span>
                                </div>
                              </div>
                            </div>
                            {isCompleted && (
                              <div className="flex items-center text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                <CheckCircle2 size={12} className="mr-1" />
                                Selesai
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VideoCoursePage;
