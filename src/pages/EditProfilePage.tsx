import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Camera, X } from "lucide-react";

// Dummy data (in real app, this would come from state management or API)
const userProfileData = {
  name: "Nawawi",
  username: "nawawi_dev",
  avatarUrl: "https://i.pravatar.cc/150?u=nawawi",
  coverImageUrl:
    "https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=2070&auto=format&fit=crop",
  title: "Full-Stack Developer & Open-Source Contributor",
  bio: "Software developer with a passion for building clean, efficient, and useful web applications. Focused on JavaScript ecosystem, especially React and Node.js.",
  skills: [
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "Tailwind CSS",
    "Next.js",
  ],
};

const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: userProfileData.name,
    username: userProfileData.username,
    title: userProfileData.title,
    bio: userProfileData.bio,
  });
  const [skills, setSkills] = useState<string[]>(userProfileData.skills);
  const [skillInput, setSkillInput] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newSkill = skillInput.trim();
      if (newSkill && !skills.includes(newSkill)) {
        setSkills([...skills, newSkill]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, you would send this data to API
    console.log("Saving profile data:", { ...formData, skills });
    alert("Profile saved successfully!");
    navigate("/profile"); // Redirect back to profile page
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* <Header /> */}
      <main className="container mx-auto px-4 lg:px-8 py-10">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
              <p className="text-gray-600 mt-1">
                Update your profile information here.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="bg-gray-200 text-gray-800 font-bold py-2 px-5 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-[#584DFF] text-white font-bold py-2 px-5 rounded-lg hover:bg-opacity-90 transition"
              >
                Save Changes
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            {/* Cover and Avatar */}
            <div className="relative">
              <div
                className="h-48 rounded-t-xl bg-cover bg-center"
                style={{
                  backgroundImage: `url(${userProfileData.coverImageUrl})`,
                }}
              ></div>
              <button
                type="button"
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                aria-label="Change cover photo"
              >
                <Camera size={20} />
              </button>
              <div className="absolute -bottom-16 left-6">
                <div className="relative">
                  <img
                    src={userProfileData.avatarUrl}
                    alt={formData.name}
                    className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-md"
                  />
                  <button
                    type="button"
                    className="absolute bottom-1 right-1 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                    aria-label="Change profile photo"
                  >
                    <Camera size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="p-6 pt-20 space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#584DFF] focus:border-transparent transition"
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#584DFF] focus:border-transparent transition"
                />
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Job Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#584DFF] focus:border-transparent transition"
                />
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#584DFF] focus:border-transparent transition"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="skills"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Skills (separate with comma or Enter)
                </label>
                <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-full"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    id="skills"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    className="flex-grow p-1 bg-transparent focus:outline-none"
                    placeholder={
                      skills.length === 0 ? "e.g., React, Node.js" : ""
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditProfilePage;
