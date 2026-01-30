import { useMemo } from 'react';
import { FolderGit2, ExternalLink } from 'lucide-react';
import { useAppStore } from '../store';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Progress from '../components/common/Progress';
import EmptyState from '../components/common/EmptyState';

const Projects = () => {
  const { projects, projectProgress, updateProjectProgress } = useAppStore();

  const projectsWithProgress = useMemo(() => {
    return projects.map((project) => {
      const progress = projectProgress.find((p) => p.project_id === project.id);
      return {
        ...project,
        status: progress?.status || 'not_started',
        completion_percentage: progress?.completion_percentage || 0,
      };
    });
  }, [projects, projectProgress]);

  const stats = useMemo(() => {
    const total = projects.length;
    const completed = projectProgress.filter((p) => p.status === 'completed').length;
    const inProgress = projectProgress.filter((p) => p.status === 'in_progress').length;
    const notStarted = total - completed - inProgress;

    return {
      total,
      completed,
      inProgress,
      notStarted,
      overallProgress: total > 0 ? (completed / total) * 100 : 0,
    };
  }, [projects, projectProgress]);

  const handleStatusChange = (projectId, status) => {
    const completionPercentage = status === 'completed' ? 100 : status === 'in_progress' ? 50 : 0;

    updateProjectProgress({
      project_id: projectId,
      status,
      completion_percentage: completionPercentage,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/20">
            <FolderGit2 className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Portfolio Projects</h1>
            <p className="text-gray-600 dark:text-gray-400">Build real-world projects to showcase your skills</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completed</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">In Progress</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.inProgress}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Not Started</p>
          <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">{stats.notStarted}</p>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900 dark:text-white">Overall Progress</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {stats.completed}/{stats.total} completed
          </span>
        </div>
        <Progress value={stats.overallProgress} color="blue" />
      </Card>

      {/* Projects Grid */}
      {projectsWithProgress.length === 0 ? (
        <EmptyState
          icon={FolderGit2}
          title="No projects available"
          description="Start building projects to add to your portfolio."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsWithProgress.map((project) => (
            <Card key={project.id} className="flex flex-col h-full">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                  <Badge variant={project.difficulty || 'intermediate'} size="sm">
                    {project.difficulty || 'intermediate'}
                  </Badge>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {project.tech_stack && project.tech_stack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech_stack.map((tech) => (
                      <Badge key={tech} variant="default" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}

                {project.features && project.features.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Key Features:</p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {project.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span className="line-clamp-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {project.completion_percentage}%
                    </span>
                  </div>
                  <Progress
                    value={project.completion_percentage}
                    color={project.status === 'completed' ? 'green' : 'blue'}
                    size="sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    value={project.status}
                    onChange={(e) => handleStatusChange(project.id, e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                  >
                    <option value="not_started">Not Started</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-900 dark:text-white transition-colors"
                  >
                    <span>View on GitHub</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
