import { useState } from 'react';
import { Settings as SettingsIcon, Sun, Moon, Download, Upload, Trash2, AlertTriangle } from 'lucide-react';
import { useThemeStore, useAppStore } from '../store';
import { storage } from '../lib/localStorage';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import toast from 'react-hot-toast';

const Settings = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { clearAllData } = useAppStore();

  const [showResetModal, setShowResetModal] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState('');

  const handleExportData = () => {
    try {
      const allData = {
        concepts: storage.get('concepts'),
        conceptProgress: storage.get('user_concept_progress'),
        dsaProblems: storage.get('dsa_problems'),
        dsaProgress: storage.get('user_dsa_progress'),
        questions: storage.get('interview_questions'),
        projects: storage.get('portfolio_projects'),
        projectProgress: storage.get('user_project_progress'),
        studySessions: storage.get('study_sessions'),
        streak: storage.get('user_streak'),
        theme: storage.get('theme'),
        exportDate: new Date().toISOString(),
      };

      const dataStr = JSON.stringify(allData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `abcomebackhogaya-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Data exported successfully!');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Failed to export data');
    }
  };

  const handleImportData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result);

        // Validate data structure
        if (!importedData || typeof importedData !== 'object') {
          throw new Error('Invalid data format');
        }

        // Confirm before importing
        if (
          !window.confirm(
            'This will replace all your current data. Are you sure you want to continue?\n\nMake sure to export your current data first if you want to keep it.'
          )
        ) {
          return;
        }

        // Import data to localStorage
        Object.entries(importedData).forEach(([key, value]) => {
          if (key !== 'exportDate' && value !== null && value !== undefined) {
            storage.set(key, value);
          }
        });

        toast.success('Data imported successfully! Reloading page...');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        console.error('Error importing data:', error);
        toast.error('Failed to import data. Invalid file format.');
      }
    };

    reader.readAsText(file);
    e.target.value = ''; // Reset file input
  };

  const handleResetData = () => {
    if (resetConfirmation !== 'RESET') {
      toast.error('Please type RESET to confirm');
      return;
    }

    try {
      clearAllData();
      toast.success('All data has been reset! Reloading page...');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Error resetting data:', error);
      toast.error('Failed to reset data');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
            <SettingsIcon className="w-8 h-8 text-gray-600 dark:text-gray-300" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your preferences and data</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <Card>
          <Card.Header>
            <Card.Title>Appearance</Card.Title>
            <Card.Description>Customize the look and feel of the application</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Theme</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Current: {theme === 'dark' ? 'Dark' : 'Light'} mode
                  </p>
                </div>
              </div>
              <Button onClick={toggleTheme} variant="outline">
                Toggle Theme
              </Button>
            </div>
          </Card.Content>
        </Card>

        {/* Data Management */}
        <Card>
          <Card.Header>
            <Card.Title>Data Management</Card.Title>
            <Card.Description>Export, import, or reset your learning data</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              {/* Export Data */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Export Data</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Download all your data as a JSON file
                    </p>
                  </div>
                </div>
                <Button onClick={handleExportData} icon={Download} variant="outline">
                  Export
                </Button>
              </div>

              {/* Import Data */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <Upload className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Import Data</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Restore data from a backup file
                    </p>
                  </div>
                </div>
                <label>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportData}
                    className="hidden"
                    aria-label="Import data file"
                  />
                  <Button as="span" icon={Upload} variant="outline">
                    Import
                  </Button>
                </label>
              </div>

              {/* Reset Data */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Reset All Data</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Permanently delete all your data
                    </p>
                  </div>
                </div>
                <Button onClick={() => setShowResetModal(true)} variant="danger" icon={Trash2}>
                  Reset
                </Button>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* About */}
        <Card>
          <Card.Header>
            <Card.Title>About</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <strong className="text-gray-900 dark:text-white">Version:</strong> 1.0.0
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white">Author:</strong> Gaurav Pasi
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white">Description:</strong> A comprehensive learning
                tracker for JavaScript, Node.js, Express, SQL, DSA, and System Architecture
              </p>
              <p className="pt-2">
                <a
                  href="https://github.com/Gaurav-pasi/AbComebackHogaya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View on GitHub
                </a>
              </p>
            </div>
          </Card.Content>
        </Card>

        {/* Storage Info */}
        <Card>
          <Card.Header>
            <Card.Title>Storage Information</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Storage Type</span>
                <span className="font-medium text-gray-900 dark:text-white">LocalStorage</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Browser</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {navigator.userAgent.includes('Chrome')
                    ? 'Chrome'
                    : navigator.userAgent.includes('Firefox')
                    ? 'Firefox'
                    : navigator.userAgent.includes('Safari')
                    ? 'Safari'
                    : 'Other'}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500 pt-2">
                Note: All data is stored locally in your browser. Clear your browser data will remove all app data.
                Make sure to export your data regularly!
              </p>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => {
          setShowResetModal(false);
          setResetConfirmation('');
        }}
        title="Reset All Data"
        size="md"
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-900 dark:text-red-300">Warning: This action is irreversible!</p>
              <p className="text-sm text-red-800 dark:text-red-400 mt-1">
                All your concepts, problems, questions, projects, and study sessions will be permanently deleted.
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Type <strong className="text-gray-900 dark:text-white">RESET</strong> to confirm:
            </p>
            <input
              type="text"
              value={resetConfirmation}
              onChange={(e) => setResetConfirmation(e.target.value)}
              placeholder="Type RESET"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white"
              autoFocus
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowResetModal(false);
                setResetConfirmation('');
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleResetData}
              disabled={resetConfirmation !== 'RESET'}
              icon={Trash2}
            >
              Reset All Data
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
