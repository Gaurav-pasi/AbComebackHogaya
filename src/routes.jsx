import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import AppLayout from './components/layout/AppLayout';
import { initializeSeedData } from './data/seedData';

// Pages
import Home from './pages/Home';
import Concepts from './pages/Concepts';
import ConceptCategory from './pages/ConceptCategory';
import DSAProblems from './pages/DSAProblems';
import Analytics from './pages/Analytics';
import Projects from './pages/Projects';
import InterviewQuestions from './pages/InterviewQuestions';
import FocusedStudy from './pages/FocusedStudy';
import NotFound from './pages/NotFound';

export default function AppRoutes() {
  useEffect(() => {
    initializeSeedData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="concepts" element={<Concepts />} />
        <Route path="concepts/:categoryId" element={<ConceptCategory />} />
        <Route path="dsa" element={<DSAProblems />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="projects" element={<Projects />} />
        <Route path="interview-questions" element={<InterviewQuestions />} />
        <Route path="study" element={<FocusedStudy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
