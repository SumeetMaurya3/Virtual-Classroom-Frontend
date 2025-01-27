import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoursePage from './Pages/CoursePage';
import HomePage from './Pages/HomePage';
import StudyPage from './Pages/StudyPage';
import TopicsPage from './Pages/TopicsPage';
import ContactUs from './Pages/ContactUs';
import LoginPage from './Pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/study" element={<StudyPage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<LoginPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
