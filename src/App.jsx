import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoursePage from "./Pages/CoursePage";
import HomePage from "./Pages/HomePage";
import StudyPage from "./Pages/new";
import TopicsPage from "./Pages/TopicsPage";
import ContactUs from "./Pages/ContactUs";
import LoginPage from "./Pages/LoginPage";
import YourCourses from "./Pages/YourCourses";
import TopicsUpdated from "./Pages/TopicsUpdated";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/course/:mainid" element={<TopicsUpdated />} />
        <Route path="/study/:mainid" element={<StudyPage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/YourCourses" element={<YourCourses />} />
      </Routes>
    </Router>
  );
}

export default App;
