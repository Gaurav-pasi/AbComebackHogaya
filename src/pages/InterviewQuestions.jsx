import { useState, useMemo } from 'react';
import { MessageSquare, Search, Plus, Edit2, Trash2, X } from 'lucide-react';
import { useAppStore } from '../store';
import { CATEGORIES } from '../utils/constants';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import EmptyState from '../components/common/EmptyState';
import toast from 'react-hot-toast';

const InterviewQuestions = () => {
  const { questions, addQuestion, updateQuestion, deleteQuestion } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
    difficulty: 'intermediate',
    tags: '',
  });

  const filteredQuestions = useMemo(() => {
    let filtered = [...questions];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (q) =>
          q.question.toLowerCase().includes(query) ||
          q.answer?.toLowerCase().includes(query) ||
          q.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter((q) => q.category === filterCategory);
    }

    // Difficulty filter
    if (filterDifficulty !== 'all') {
      filtered = filtered.filter((q) => q.difficulty === filterDifficulty);
    }

    return filtered;
  }, [questions, searchQuery, filterCategory, filterDifficulty]);

  const stats = useMemo(() => {
    return {
      total: questions.length,
      byCategory: CATEGORIES.reduce((acc, cat) => {
        acc[cat.id] = questions.filter((q) => q.category === cat.id).length;
        return acc;
      }, {}),
    };
  }, [questions]);

  const handleOpenAddModal = () => {
    setFormData({
      question: '',
      answer: '',
      category: '',
      difficulty: 'intermediate',
      tags: '',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (question) => {
    setCurrentQuestion(question);
    setFormData({
      question: question.question,
      answer: question.answer || '',
      category: question.category,
      difficulty: question.difficulty || 'intermediate',
      tags: question.tags?.join(', ') || '',
    });
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setCurrentQuestion(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.question.trim() || !formData.category) {
      toast.error('Please fill in required fields');
      return;
    }

    const questionData = {
      question: formData.question.trim(),
      answer: formData.answer.trim(),
      category: formData.category,
      difficulty: formData.difficulty,
      tags: formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t),
    };

    if (currentQuestion) {
      updateQuestion(currentQuestion.id, questionData);
      toast.success('Question updated successfully');
    } else {
      addQuestion(questionData);
      toast.success('Question added successfully');
    }

    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      deleteQuestion(id);
      toast.success('Question deleted successfully');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/20">
              <MessageSquare className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Interview Questions</h1>
              <p className="text-gray-600 dark:text-gray-400">Prepare for technical interviews</p>
            </div>
          </div>
          <Button icon={Plus} onClick={handleOpenAddModal}>
            Add Question
          </Button>
        </div>
      </div>

      {/* Stats */}
      <Card className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Questions</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
          </div>
          {CATEGORIES.slice(0, 3).map((cat) => (
            <div key={cat.id}>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{cat.name}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.byCategory[cat.id] || 0}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Filters */}
      <Card className="mb-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            />
          </div>

          {/* Category and Difficulty Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Questions List */}
      {filteredQuestions.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No questions found"
          description={
            questions.length === 0
              ? 'Start adding interview questions to practice.'
              : 'Try adjusting your filters or search query.'
          }
          action={questions.length === 0}
          actionLabel="Add Question"
          onAction={handleOpenAddModal}
        />
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((question, index) => (
            <Card key={question.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                      {index + 1}. {question.question}
                    </h3>
                  </div>

                  {question.answer && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 whitespace-pre-wrap">
                      {question.answer}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="primary">
                      {CATEGORIES.find((c) => c.id === question.category)?.name || question.category}
                    </Badge>
                    <Badge variant={question.difficulty || 'intermediate'}>
                      {question.difficulty || 'intermediate'}
                    </Badge>
                    {question.tags?.map((tag) => (
                      <Badge key={tag} variant="default" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Edit2}
                    onClick={() => handleOpenEditModal(question)}
                    aria-label="Edit question"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Trash2}
                    onClick={() => handleDelete(question.id)}
                    aria-label="Delete question"
                    className="text-red-600 hover:text-red-700 dark:text-red-400"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={handleCloseModal}
        title={currentQuestion ? 'Edit Question' : 'Add Question'}
        footer={
          <>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>{currentQuestion ? 'Update' : 'Add'}</Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Question *
            </label>
            <textarea
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="Enter your question..."
              rows={3}
              required
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Answer</label>
            <textarea
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              placeholder="Enter the answer..."
              rows={5}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
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

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g., async, promises, callbacks"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default InterviewQuestions;
