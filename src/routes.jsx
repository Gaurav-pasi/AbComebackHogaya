import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import AppLayout from './components/layout/AppLayout';
import { initializeSeedData } from './data/seedData';

// Pages
import Home from './pages/Home';
import Concepts from './pages/Concepts';
import ConceptCategory from './pages/ConceptCategory';
import DSAProblems from './pages/DSAProblems';
import Settings from './pages/Settings';
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
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
