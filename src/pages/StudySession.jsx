import { useState } from 'react';
import { Clock, Calendar, BookOpen, Save } from 'lucide-react';
import { useAppStore } from '../store';
import { CATEGORIES, ACTIVITY_TYPES } from '../utils/constants';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const StudySession = () => {
  const { addStudySession, studySessions } = useAppStore();

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    activity_type: ACTIVITY_TYPES.CONCEPT,
    category: '',
    duration_minutes: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.duration_minutes || !formData.activity_type) {
      toast.error('Please fill in required fields');
      return;
    }

    setLoading(true);

    try {
      const sessionData = {
        date: formData.date,
        activity_type: formData.activity_type,
        category: formData.category || null,
        duration_minutes: parseInt(formData.duration_minutes),
        notes: formData.notes.trim() || null,
      };

      addStudySession(sessionData);
      toast.success('Study session logged successfully!');

      // Reset form
      setFormData({
        date: new Date().toISOString().split('T')[0],
        activity_type: ACTIVITY_TYPES.CONCEPT,
        category: '',
        duration_minutes: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error logging study session:', error);
      toast.error('Failed to log study session');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Recent sessions
  const recentSessions = studySessions
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 rounded-lg bg-cyan-100 dark:bg-cyan-900/20">
            <Clock className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Log Study Session</h1>
            <p className="text-gray-600 dark:text-gray-400">Track your study time and maintain your streak</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card>
            <Card.Header>
              <Card.Title>New Study Session</Card.Title>
              <Card.Description>Record your learning activity for today</Card.Description>
            </Card.Header>
            <Card.Content>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      max={new Date().toISOString().split('T')[0]}
                      required
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Activity Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Activity Type *
                  </label>
                  <select
                    name="activity_type"
                    value={formData.activity_type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                  >
                    <option value={ACTIVITY_TYPES.CONCEPT}>Concept Study</option>
                    <option value={ACTIVITY_TYPES.DSA}>DSA Practice</option>
                    <option value={ACTIVITY_TYPES.INTERVIEW_PREP}>Interview Preparation</option>
                    <option value={ACTIVITY_TYPES.PROJECT}>Project Work</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category (Optional)
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Duration (minutes) *
                  </label>
                  <input
                    type="number"
                    name="duration_minutes"
                    value={formData.duration_minutes}
                    onChange={handleChange}
                    min="1"
                    max="1440"
                    placeholder="e.g., 60"
                    required
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {formData.duration_minutes && `${Math.floor(formData.duration_minutes / 60)}h ${formData.duration_minutes % 60}m`}
                  </p>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="What did you learn? Any key takeaways?"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" icon={Save} disabled={loading} loading={loading} className="w-full">
                  {loading ? 'Logging Session...' : 'Log Study Session'}
                </Button>
              </form>
            </Card.Content>
          </Card>
        </div>

        {/* Sidebar - Recent Sessions & Stats */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <Card.Header>
              <Card.Title>Today's Summary</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Sessions</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{studySessions.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Study Time</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {Math.round(studySessions.reduce((sum, s) => sum + (s.duration_minutes || 0), 0) / 60)}h
                  </p>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Recent Sessions */}
          <Card>
            <Card.Header>
              <Card.Title>Recent Sessions</Card.Title>
            </Card.Header>
            <Card.Content>
              {recentSessions.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No sessions logged yet</p>
              ) : (
                <div className="space-y-3">
                  {recentSessions.map((session, index) => (
                    <div
                      key={session.id || index}
                      className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          {session.activity_type.replace('_', ' ')}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {session.duration_minutes}m
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {new Date(session.date || session.created_at).toLocaleDateString()}
                      </p>
                      {session.notes && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {session.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card.Content>
          </Card>

          {/* Tips */}
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 border-0">
            <div className="text-white">
              <h3 className="font-semibold mb-2">Study Tips</h3>
              <ul className="text-sm space-y-1 opacity-90">
                <li>• Be consistent daily</li>
                <li>• Track your progress</li>
                <li>• Take regular breaks</li>
                <li>• Review regularly</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudySession;
