import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import PersonalizePage from "./pages/PersonalizePage";
import LoginPage from "./pages/LoginPage";
import CoursesPage from "./pages/CoursePage";
import CourseDetailPage from "./pages/CourseDetailPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import VideoCoursePage from "./pages/VideoCoursePage";
import PortfolioPage from "./pages/PortfolioPage";
import ProjectDetailPage from "./pages/PorjectDetailPage";
import ProjectListPage from "./pages/ProjectListPage";
import ForumPage from "./pages/ForumPage";
import UserProfilePage from "./pages/UserProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import NewForumPage from "./pages/NewForumPage";
import ForumDetailPage from "./pages/ForumDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/personalize" element={<PersonalizePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/courses" element={<CoursesPage />}></Route>
        <Route path="/video/:id" element={<VideoCoursePage />}></Route>
        <Route path="/course/:id" element={<CourseDetailPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/:courseId" element={<PortfolioPage />} />
        <Route path="/projects" element={<ProjectListPage />}></Route>
        <Route path="/project/:id" element={<ProjectDetailPage />}></Route>
        <Route path="/discussion" element={<ForumPage />}></Route>
        <Route path="/profile" element={<UserProfilePage />}></Route>
        <Route path="/profile/edit" element={<EditProfilePage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/checkout" element={<CheckoutPage />}></Route>
        <Route path="/newforum" element={<NewForumPage/>}></Route>
        <Route path="/discussion/:id" element={<ForumDetailPage/>}></Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
