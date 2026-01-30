import { storage } from '../lib/localStorage';
import { STORAGE_KEYS } from '../utils/constants';
import { useAppStore } from '../store';

// Import seed data (these will be created as separate JSON files)
// For now, we'll define inline for initial setup
import javascriptConcepts from './javascript_concepts.json';
import nodejsConcepts from './nodejs_concepts.json';
import expressConcepts from './express_concepts.json';
import sqlConcepts from './sql_concepts.json';
import dsaConcepts from './dsa_concepts.json';
import systemArchitectureConcepts from './system_architecture_concepts.json';
import dsaProblems from './dsa_problems.json';
import portfolioProjects from './portfolio_projects.json';

export function initializeSeedData() {
  // Check if already initialized
  const initialized = storage.get(STORAGE_KEYS.INITIALIZED);

  if (!initialized) {
    console.log('Initializing seed data...');

    try {
      // Combine all concepts
      const allConcepts = [
        ...javascriptConcepts,
        ...nodejsConcepts,
        ...expressConcepts,
        ...sqlConcepts,
        ...dsaConcepts,
        ...systemArchitectureConcepts,
      ];

      // Load into store
      const store = useAppStore.getState();
      store.loadSeedData({
        concepts: allConcepts,
        dsaProblems: dsaProblems,
        projects: portfolioProjects,
      });

      // Mark as initialized
      storage.set(STORAGE_KEYS.INITIALIZED, true);

      console.log('Seed data initialized successfully!');
      console.log(`Loaded ${allConcepts.length} concepts`);
      console.log(`Loaded ${dsaProblems.length} DSA problems`);
      console.log(`Loaded ${portfolioProjects.length} projects`);
    } catch (error) {
      console.error('Error initializing seed data:', error);
    }
  }
}

// Export for manual re-initialization
export function resetAndReinitialize() {
  storage.clear();
  initializeSeedData();
}
