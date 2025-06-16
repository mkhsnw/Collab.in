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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/personalize" element={<PersonalizePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/courses" element={<CoursesPage />}></Route>
        <Route path="/course/:id" element={<CourseDetailPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
