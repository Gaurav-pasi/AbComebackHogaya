import { storage } from '../lib/localStorage';
import { STORAGE_KEYS } from '../utils/constants';
import { useAppStore } from '../store';

// Import seed data
import javascriptConcepts from './javascript_concepts.json';
import nodejsConcepts from './nodejs_concepts.json';
import expressConcepts from './express_concepts.json';
import sqlConcepts from './sql_concepts.json';
import dsaConcepts from './dsa_concepts.json';
import systemArchitectureConcepts from './system_architecture_concepts.json';
import dsaProblems from './dsa_problems.json';
import portfolioProjects from './portfolio_projects.json';

const DATA_VERSION = '3.1'; // Increment this when data structure changes

export function initializeSeedData() {
  // Check if already initialized with current version
  const initialized = storage.get(STORAGE_KEYS.INITIALIZED);
  const currentVersion = storage.get('data_version');

  if (!initialized || currentVersion !== DATA_VERSION) {
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

      console.log('Total concepts to load:', allConcepts.length);
      console.log('Sample concept:', allConcepts[0]);

      // Load into store
      const store = useAppStore.getState();
      store.loadSeedData({
        concepts: allConcepts,
        dsaProblems: dsaProblems,
        projects: portfolioProjects,
      });

      // Mark as initialized with version
      storage.set(STORAGE_KEYS.INITIALIZED, true);
      storage.set('data_version', DATA_VERSION);

      console.log('Seed data initialized successfully!');
      console.log(`Loaded ${allConcepts.length} concepts`);
      console.log(`Loaded ${dsaProblems.length} DSA problems`);
      console.log(`Loaded ${portfolioProjects.length} projects`);
    } catch (error) {
      console.error('Error initializing seed data:', error);
    }
  } else {
    console.log('Seed data already initialized (version ' + DATA_VERSION + ')');
  }
}

// Export for manual re-initialization
export function resetAndReinitialize() {
  storage.clear();
  initializeSeedData();
}
