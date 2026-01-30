import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Concepts from './pages/Concepts';
import ConceptCategory from './pages/ConceptCategory';
import DSAProblems from './pages/DSAProblems';
import ProblemDetail from './pages/ProblemDetail';
import InterviewQuestions from './pages/InterviewQuestions';
import Projects from './pages/Projects';
import Analytics from './pages/Analytics';
import StudySession from './pages/StudySession';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Concepts */}
        <Route path="concepts" element={<Concepts />} />
        <Route path="concepts/:categoryId" element={<ConceptCategory />} />

        {/* DSA */}
        <Route path="dsa" element={<DSAProblems />} />
        <Route path="dsa/:problemId" element={<ProblemDetail />} />

        {/* Interview Questions */}
        <Route path="questions" element={<InterviewQuestions />} />

        {/* Projects */}
        <Route path="projects" element={<Projects />} />

        {/* Analytics */}
        <Route path="analytics" element={<Analytics />} />

        {/* Study Session */}
        <Route path="study" element={<StudySession />} />

        {/* Settings */}
        <Route path="settings" element={<Settings />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
