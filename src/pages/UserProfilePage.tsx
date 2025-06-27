import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Award,
  MessageSquare,
  Edit,
  UserPlus,
  GitBranch,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Footer, Header } from "../components/common";
import { currentUser } from "../data/dashboardData";

// --- DATA DUMMY UNTUK PROFIL PENGGUNA ---
const userProfileData = {
  isOwnProfile: true, // Ganti jadi 'false' untuk melihat tampilan profil orang lain
  name: "Nawawi",
  username: "nawawi_dev",
  avatarUrl: "https://i.pravatar.cc/150?u=nawawi",
  coverImageUrl:
    "https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=2070&auto=format&fit=crop",
  title: "Full-Stack Developer & Open-Source Contributor",
  joinDate: "2024-01-15T10:00:00Z",
  bio: "Pengembang perangkat lunak dengan hasrat untuk membangun aplikasi web yang bersih, efisien, dan bermanfaat. Fokus pada ekosistem JavaScript, terutama React dan Node.js.",
  skills: [
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "Tailwind CSS",
    "Next.js",
  ],
  stats: {
    projects: 4,
    courses: 7,
    discussions: 28,
  },
  contributions: [
    {
      id: "proj-001",
      title: "Collab.in - Platform Kolaborasi",
      imageUrl:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80",
      role: "Lead Frontend",
    },
    {
      id: "proj-004",
      title: "Portofolio Generator Otomatis",
      imageUrl:
        "https://images.unsplash.com/photo-1542626991-a2f575a7e6a8?q=80",
      role: "Contributor",
    },
  ],
  certificates: [
    { id: "cert-01", title: "React - The Complete Guide", issuer: "Academind" },
    {
      id: "cert-02",
      title: "Node.js, Express, MongoDB & More",
      issuer: "Jonas S.",
    },
  ],
  recentActivity: [
    {
      id: "act-1",
      type: "complete_course",
      title: "Dasar Pemrograman Web",
      date: "2025-06-25T10:00:00Z",
    },
    {
      id: "act-2",
      type: "new_contribution",
      title: "Collab.in",
      date: "2025-06-24T15:30:00Z",
    },
    {
      id: "act-3",
      type: "new_discussion",
      title: "Bagaimana handle error async?",
      date: "2025-06-23T09:00:00Z",
    },
  ],
};

const activityIcons = {
  complete_course: <CheckCircle className="text-green-500" size={20} />,
  new_contribution: <GitBranch className="text-[#584DFF]" size={20} />,
  new_discussion: <MessageSquare className="text-orange-500" size={20} />,
};

// --- Komponen Utama Halaman Profil ---
const UserProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("contributions");

  const TabButton = ({ id, label }: { id: string; label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 font-semibold transition-colors duration-200 border-b-2 ${
        activeTab === id
          ? "border-[#584DFF] text-[#584DFF]"
          : "border-transparent text-gray-500 hover:border-gray-300"
      }`}
    >
      {label}
    </button>
  );

  // Helper component for empty states in tabs
  const EmptyState = ({ message }: { message: string }) => (
    <div className="text-center py-16 bg-gray-50 rounded-lg">
      <p className="text-gray-500">{message}</p>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header currentUser={currentUser} />

      <main className="container mx-auto px-4 lg:px-8 py-10">
        {/* --- HEADER PROFIL (COVER & AVATAR) --- */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8">
          <div
            className="h-48 rounded-t-xl bg-cover bg-center"
            style={{ backgroundImage: `url(${userProfileData.coverImageUrl})` }}
          ></div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-24 sm:-mt-20">
              <img
                src={userProfileData.avatarUrl}
                alt={userProfileData.name}
                className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-md"
              />
              <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900">
                  {userProfileData.name}
                </h1>
                <p className="text-gray-500">@{userProfileData.username}</p>
              </div>
              <div className="sm:ml-auto mt-4 sm:mt-0">
                {userProfileData.isOwnProfile ? (
                  <Link
                    to="/profile/edit"
                    className="bg-[#584DFF] text-white font-bold py-2 px-5 rounded-lg hover:bg-opacity-90 transition flex items-center"
                  >
                    <Edit size={16} className="mr-2" /> Edit Profil
                  </Link>
                ) : (
                  <button className="bg-gray-200 text-gray-800 font-bold py-2 px-5 rounded-lg hover:bg-gray-300 transition flex items-center">
                    <UserPlus size={16} className="mr-2" /> Follow
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- BAGIAN STATISTIK --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <GitBranch size={24} className="text-[#584DFF]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {userProfileData.stats.projects}
              </p>
              <p className="text-sm text-gray-500">Proyek & Kontribusi</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Award size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {userProfileData.stats.courses}
              </p>
              <p className="text-sm text-gray-500">Kursus Selesai</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <MessageSquare size={24} className="text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {userProfileData.stats.discussions}
              </p>
              <p className="text-sm text-gray-500">Diskusi Forum</p>
            </div>
          </div>
        </div>

        {/* --- LAYOUT DUA KOLOM --- */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* --- SIDEBAR KIRI --- */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg mb-4">Tentang Saya</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {userProfileData.bio}
                </p>
                <div className="text-sm text-gray-500 space-y-2">
                  <div className="flex items-center">
                    <Briefcase size={16} className="mr-3" />
                    <span>{userProfileData.title}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-3" />
                    <span>
                      Bergabung sejak{" "}
                      {new Date(userProfileData.joinDate).toLocaleDateString(
                        "id-ID",
                        { year: "numeric", month: "long" }
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg mb-4">Keahlian</h3>
                <div className="flex flex-wrap gap-2">
                  {userProfileData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* --- KONTEN UTAMA KANAN --- */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="border-b border-gray-200 mb-6">
                <div className="flex space-x-2 md:space-x-4">
                  <TabButton
                    id="contributions"
                    label={`Kontribusi (${userProfileData.contributions.length})`}
                  />
                  <TabButton id="activity" label="Aktivitas" />
                  <TabButton
                    id="certificates"
                    label={`Sertifikat (${userProfileData.certificates.length})`}
                  />
                </div>
              </div>

              {/* Konten Tab */}
              <div>
                {activeTab === "contributions" && (
                  <div>
                    {userProfileData.contributions.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {userProfileData.contributions.map((proj) => (
                          <div
                            key={proj.id}
                            className="border rounded-lg overflow-hidden group"
                          >
                            <img
                              src={proj.imageUrl}
                              alt={proj.title}
                              className="h-32 w-full object-cover"
                            />
                            <div className="p-4">
                              <h4 className="font-bold group-hover:text-[#584DFF] transition">
                                {proj.title}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {proj.role}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <EmptyState message="Pengguna ini belum memiliki kontribusi." />
                    )}
                  </div>
                )}
                {activeTab === "activity" && (
                  <div>
                    {userProfileData.recentActivity.length > 0 ? (
                      <div className="space-y-4">
                        {userProfileData.recentActivity.map((act) => (
                          <div
                            key={act.id}
                            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50"
                          >
                            <div className="bg-gray-100 p-2 rounded-full">
                              {
                                activityIcons[
                                  act.type as keyof typeof activityIcons
                                ]
                              }
                            </div>
                            <p className="text-sm text-gray-700">
                              Anda telah{" "}
                              <span className="font-semibold">
                                {act.type.replace("_", " ")}
                              </span>{" "}
                              "{act.title}"
                            </p>
                            <p className="ml-auto text-xs text-gray-400">
                              {new Date(act.date).toLocaleDateString("id-ID")}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <EmptyState message="Tidak ada aktivitas terbaru untuk ditampilkan." />
                    )}
                  </div>
                )}
                {activeTab === "certificates" && (
                  <div>
                    {userProfileData.certificates.length > 0 ? (
                      <div className="space-y-4">
                        {userProfileData.certificates.map((cert) => (
                          <div
                            key={cert.id}
                            className="flex items-center p-4 border rounded-lg"
                          >
                            <div className="p-2 bg-yellow-100 rounded-full mr-4">
                              <Award size={24} className="text-yellow-500" />
                            </div>
                            <div>
                              <h4 className="font-bold">{cert.title}</h4>
                              <p className="text-sm text-gray-500">
                                Diterbitkan oleh {cert.issuer}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <EmptyState message="Pengguna ini belum memiliki sertifikat." />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default UserProfilePage;
