import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Briefcase,
  ArrowRight,
  Loader2,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Define interfaces
interface ProfessionData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  hoverColor: string;
}

interface UserData {
  fullName: string;
  email: string;
  registrationDate: string;
}

const PersonalizePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProfession, setSelectedProfession] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Check if user came from registration
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const onboardingStep = localStorage.getItem("onboardingStep");

    if (!storedUserData || onboardingStep !== "1") {
      // Redirect to sign up if not coming from registration
      navigate("/signup");
      return;
    }

    setUserData(JSON.parse(storedUserData));
  }, [navigate]);

  // Profession options data
  const professions: ProfessionData[] = [
    {
      id: "student",
      title: "Student",
      description: "I'm a student working on projects and learning new skills",
      icon: <GraduationCap className="w-8 h-8" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
    },
    {
      id: "freelancer",
      title: "Freelancer",
      description: "I work independently and collaborate with various clients",
      icon: <Briefcase className="w-8 h-8" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100",
    },
  ];

  // Handle profession selection
  const handleProfessionSelect = (professionId: string): void => {
    setSelectedProfession(professionId);
  };

  // Handle form submission
  const handleContinue = async (): Promise<void> => {
    if (!selectedProfession) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update localStorage with profession data
      const currentUserData = JSON.parse(
        localStorage.getItem("userData") || "{}"
      );
      const updatedUserData = {
        ...currentUserData,
        profession: selectedProfession,
        onboardingCompleted: true,
      };

      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      localStorage.setItem("onboardingStep", "2");

      console.log("Selected profession:", selectedProfession);

      // Navigate to dashboard or next step
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle skip option
  const handleSkip = (): void => {
    if (
      confirm(
        "Are you sure you want to skip this step? We can personalize your experience better if you select your profession."
      )
    ) {
      console.log("Skipping profession selection");
      navigate("/dashboard");
    }
  };

  // Calculate completion percentage
  // const getCompletionPercentage = (): number => {
  //   return selectedProfession ? 100 : 0;
  // };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Logo */}
          <div className="flex items-center justify-center mb-2">
            <div className="flex items-center space-x-2">
              <img
                src="/collabin.png"
                alt="Collab.in Logo"
                className="h-24 w-auto"
              />
            </div>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-indigo-500 rounded-full shadow-sm"></div>
              <div className="w-3 h-3 bg-indigo-500 rounded-full shadow-sm"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
            <span className="ml-4 text-sm text-gray-500">
              Step 2 of 3 • Personalization
            </span>
          </div>

          {/* Welcome message with user's name */}
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">
            Welcome, {userData.fullName.split(" ")[0]}! 👋
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-lg mx-auto">
            Let's personalize your experience. What best describes your current
            situation?
          </p>
        </div>

        {/* Profession Selection Cards */}
        <div className="space-y-4 mb-8">
          {professions.map((profession) => (
            <div
              key={profession.id}
              onClick={() => handleProfessionSelect(profession.id)}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${
                selectedProfession === profession.id
                  ? `border-indigo-500 ${profession.bgColor} shadow-lg`
                  : `border-gray-200 bg-white hover:border-gray-300 ${profession.hoverColor} shadow-sm hover:shadow-md`
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Icon */}
                  <div
                    className={`p-3 rounded-xl ${profession.bgColor} ${profession.color}`}
                  >
                    {profession.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {profession.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {profession.description}
                    </p>
                  </div>
                </div>

                {/* Selection indicator */}
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                    selectedProfession === profession.id
                      ? "border-indigo-500 bg-indigo-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedProfession === profession.id && (
                    <Check className="w-4 h-4 text-white mx-auto mt-0.5" />
                  )}
                </div>
              </div>

              {/* Highlight border animation */}
              {selectedProfession === profession.id && (
                <div className="absolute inset-0 rounded-2xl border-2 border-indigo-500 animate-pulse"></div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleContinue}
            disabled={!selectedProfession || isLoading}
            className="w-full bg-[#504DFF] hover:bg-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:cursor-not-allowed disabled:transform-none disabled:opacity-60"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin w-5 h-5 mr-2" />
                Setting up your profile...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span>Continue to Login</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            )}
          </button>

          <button
            onClick={handleSkip}
            disabled={isLoading}
            className="w-full text-gray-600 hover:text-gray-800 font-medium py-3 px-4 rounded-xl transition-colors duration-200 disabled:opacity-50"
          >
            Skip for now
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Don't worry, you can always change this later in your profile
            settings.
          </p>

          <div className="flex items-center justify-center space-x-6 text-xs text-gray-400">
            <span>• Secure & Private</span>
            <span>• No Spam</span>
            <span>• Easy to Change</span>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>
      </div>
    </div>
  );
};

export default PersonalizePage;
