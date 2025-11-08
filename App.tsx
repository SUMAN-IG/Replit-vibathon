import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Toaster, toast } from 'sonner@2.0.3';
import { Plus } from 'lucide-react';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { TopBar } from './components/TopBar';
import { StatsOverview } from './components/StatsOverview';
import { CompletedTaskCard } from './components/CompletedTaskCard';
import { InProgressTaskCard } from './components/InProgressTaskCard';
import { PendingTaskCard } from './components/PendingTaskCard';
import { TeamDashboard } from './components/TeamDashboard';
import { CategorySummary } from './components/CategorySummary';
import { RemindersPopover } from './components/RemindersPopover';
import { EnhancedAIChatButton } from './components/EnhancedAIChatButton';
import { NavigationTabs } from './components/NavigationTabs';
import { DailyTimeline } from './components/DailyTimeline';
import { SchedulePage } from './components/SchedulePage';
import { TaskCompletionOverlay } from './components/TaskCompletionOverlay';
import { SoloModeGraphs } from './components/SoloModeGraphs';
import { TeamModeGraphs } from './components/TeamModeGraphs';
import { BehaviorStudyAdvices } from './components/BehaviorStudyAdvices';
import { EnhancedPredictionIntelligence } from './components/EnhancedPredictionIntelligence';
import { DraggableTaskCard } from './components/DraggableTaskCard';
import { DroppableColumn } from './components/DroppableColumn';
import { AddTaskDialog } from './components/AddTaskDialog';
import { TaskDetailDialog } from './components/TaskDetailDialog';
import { DailyReportAnalysis } from './components/DailyReportAnalysis';
import { ThanosSnapOverlay } from './components/ThanosSnapOverlay';
import { WelcomeBanner } from './components/WelcomeBanner';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  completedBy?: string;
  assignee: string;
  category: 'Business' | 'Personal';
  isShared?: boolean;
  sharedWith?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  startedAt?: string;
  progress?: number;
  imageUrl?: string;
  deadline?: string;
}

const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Redesign Landing Page',
    description: 'Update the hero section, colors, and typography to match new brand guidelines.',
    status: 'Completed',
    completedBy: 'You',
    assignee: 'You',
    category: 'Business',
    isShared: false,
  },
  {
    id: 'task-2',
    title: 'Database Schema Update',
    description: 'Optimize database structure and add necessary indexes.',
    status: 'Completed',
    completedBy: 'Alice Chen',
    assignee: 'Alice Chen',
    category: 'Business',
    isShared: false,
  },
  {
    id: 'task-3',
    title: 'Dribbles Shot 7',
    description: 'Create a new Dribbble shot showcasing the dashboard interface.',
    status: 'Completed',
    completedBy: 'You',
    assignee: 'You',
    category: 'Personal',
    isShared: false,
    imageUrl: 'https://images.unsplash.com/photo-1602794297301-8aadc0fecf7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBtYXRlcmlhbCUyMG1vY2t1cHxlbnwxfHx8fDE3NjI1NzUwMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'task-4',
    title: 'Create Material for Samaritan Section',
    description: 'Design and develop marketing materials for the new product launch.',
    status: 'In Progress',
    scheduledTime: '10:00 AM',
    startedAt: '2h ago',
    progress: 65,
    assignee: 'You',
    category: 'Business',
    isShared: false,
    imageUrl: 'https://images.unsplash.com/photo-1602794297301-8aadc0fecf7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBtYXRlcmlhbCUyMG1vY2t1cHxlbnwxfHx8fDE3NjI1NzUwMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'task-5',
    title: 'Design UI/UX Dashboard',
    description: 'Complete the design system and component library for the new dashboard.',
    status: 'In Progress',
    scheduledTime: '09:30 AM',
    startedAt: '3h ago',
    progress: 45,
    assignee: 'Rana Kumar',
    category: 'Business',
    isShared: false,
    imageUrl: 'https://images.unsplash.com/photo-1761593280919-766a4acbcfca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzYyNTAxMTY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'task-6',
    title: 'API Integration Testing',
    description: 'Test all API endpoints and document response schemas.',
    status: 'In Progress',
    scheduledTime: '11:00 AM',
    startedAt: '1h ago',
    progress: 30,
    assignee: 'You',
    category: 'Business',
    isShared: true,
    sharedWith: 'Alice Chen',
    imageUrl: 'https://images.unsplash.com/photo-1702396303987-ba7478448408?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGklMjB0ZXN0aW5nJTIwY29kZXxlbnwxfHx8fDE3NjI1NzUwMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'task-7',
    title: 'User Feedback Analysis',
    description: 'Review and categorize user feedback from the last sprint.',
    status: 'In Progress',
    scheduledTime: '02:00 PM',
    startedAt: '30m ago',
    progress: 20,
    assignee: 'Suman Patel',
    category: 'Business',
    isShared: false,
    imageUrl: 'https://images.unsplash.com/photo-1602794297301-8aadc0fecf7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBtYXRlcmlhbCUyMG1vY2t1cHxlbnwxfHx8fDE3NjI1NzUwMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'task-8',
    title: 'Performance Optimization',
    description: 'Improve page load times and optimize asset delivery.',
    status: 'In Progress',
    scheduledTime: '01:00 PM',
    startedAt: '1.5h ago',
    progress: 55,
    assignee: 'You',
    category: 'Personal',
    isShared: false,
    imageUrl: 'https://images.unsplash.com/photo-1761593280919-766a4acbcfca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzYyNTAxMTY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'task-9',
    title: 'Update Photo Profile Instagram',
    description: 'Refresh company Instagram profile with new branding photos.',
    status: 'Pending',
    scheduledDate: 'Nov 10',
    scheduledTime: '03:00 PM',
    assignee: 'You',
    category: 'Personal',
    isShared: false,
    imageUrl: 'https://images.unsplash.com/photo-1628563694622-5a76957fd09c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWdyYW0lMjBwcm9maWxlfGVufDF8fHx8MTc2MjU3NTA0MHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'task-10',
    title: 'Mobile App Wireframes',
    description: 'Create wireframes for the mobile version of the application.',
    status: 'Pending',
    scheduledDate: 'Nov 11',
    scheduledTime: '10:00 AM',
    assignee: 'Marcus Johnson',
    category: 'Business',
    isShared: false,
    imageUrl: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjB3aXJlZnJhbWUlMjBza2V0Y2h8ZW58MXx8fHwxNzYyNTc1MDQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'task-11',
    title: 'Documentation Update',
    description: 'Update technical documentation with latest API changes.',
    status: 'Pending',
    scheduledDate: 'Nov 12',
    scheduledTime: '09:00 AM',
    assignee: 'You',
    category: 'Business',
    isShared: true,
    sharedWith: 'Marcus Johnson',
    imageUrl: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N1bWVudGF0aW9uJTIwY29kZXxlbnwxfHx8fDE3NjI1NzUwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'task-12',
    title: 'Photo Profile Instagram',
    description: 'Take professional photos for team member profiles.',
    status: 'Pending',
    scheduledDate: 'Nov 13',
    scheduledTime: '02:30 PM',
    assignee: 'Alice Chen',
    category: 'Personal',
    isShared: false,
    imageUrl: 'https://images.unsplash.com/photo-1628563694622-5a76957fd09c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWdyYW0lMjBwcm9maWxlfGVufDF8fHx8MTc2MjU3NTA0MHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; username: string } | null>(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [mode, setMode] = useState<'solo' | 'team'>('solo');
  const [activeTab, setActiveTab] = useState<'projects' | 'schedule' | 'team'>('projects');
  const [showCompletionOverlay, setShowCompletionOverlay] = useState(false);
  const [completedTaskTitle, setCompletedTaskTitle] = useState('');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [showThanosSnap, setShowThanosSnap] = useState(false);
  const [snapTaskTitle, setSnapTaskTitle] = useState('');
  const [nextTask, setNextTask] = useState<{ title: string; date?: string; time?: string } | null>(null);

  // Handle adding a new task
  const handleAddTask = (taskData: {
    title: string;
    description: string;
    category: 'Business' | 'Personal';
    assignee: string;
    scheduledDate: string;
    scheduledTime: string;
    deadline: string;
  }) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: taskData.title,
      description: taskData.description,
      status: 'Pending',
      assignee: taskData.assignee,
      category: taskData.category,
      scheduledDate: taskData.scheduledDate,
      scheduledTime: taskData.scheduledTime,
      deadline: taskData.deadline,
      isShared: false,
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  // Handle deleting a task
  const handleDeleteTask = (taskId: string) => {
    const taskToDelete = tasks.find(t => t.id === taskId);
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    
    if (taskToDelete) {
      toast.success('Task deleted', {
        description: `${taskToDelete.title} has been removed.`,
      });
    }
  };

  // Handle task drag and drop
  const handleTaskDrop = (taskId: string, newStatus: 'Completed' | 'In Progress' | 'Pending') => {
    const movedTask = tasks.find(t => t.id === taskId);
    
    // If task is being moved to Completed, show Thanos snap animation
    if (newStatus === 'Completed' && movedTask) {
      setSnapTaskTitle(movedTask.title);
      
      // Find the next pending or in-progress task
      const currentTasks = mode === 'solo' ? soloTasks : tasks;
      const upcomingTask = currentTasks.find(
        t => t.id !== taskId && (t.status === 'Pending' || t.status === 'In Progress')
      );
      
      if (upcomingTask) {
        setNextTask({
          title: upcomingTask.title,
          date: upcomingTask.scheduledDate,
          time: upcomingTask.scheduledTime,
        });
      } else {
        setNextTask(null);
      }
      
      setShowThanosSnap(true);
    } else {
      // For non-completed status, show regular toast
      if (movedTask) {
        toast.success(`Task moved to ${newStatus}`, {
          description: movedTask.title,
        });
      }
    }
    
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => {
        if (task.id === taskId) {
          const updatedTask = { ...task, status: newStatus };
          if (newStatus === 'Completed') {
            updatedTask.completedBy = task.assignee;
          }
          return updatedTask;
        }
        return task;
      });
      
      return updatedTasks;
    });
  };

  // Filter tasks for solo mode
  const soloTasks = tasks.filter(task => task.assignee === 'You');
  
  // Calculate category summaries
  const personalTasks = soloTasks.filter(t => t.category === 'Personal');
  const businessTasks = soloTasks.filter(t => t.category === 'Business');
  const personalCompleted = personalTasks.filter(t => t.status === 'Completed').length;
  const businessCompleted = businessTasks.filter(t => t.status === 'Completed').length;

  // Calculate stats for current mode
  const currentTasks = mode === 'solo' ? soloTasks : tasks;
  const completedCount = currentTasks.filter(t => t.status === 'Completed').length;
  const inProgressCount = currentTasks.filter(t => t.status === 'In Progress').length;
  const pendingCount = currentTasks.filter(t => t.status === 'Pending').length;

  // Handle task card click
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskDetailOpen(true);
  };

  // Handle user login
  const handleLogin = (userData: { name: string; email: string; username: string }) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
    toast.success(`Welcome back, ${userData.name}!`, {
      description: 'You have successfully signed in.',
    });
  };

  // Handle user sign up
  const handleSignUp = (userData: { name: string; email: string; username: string }) => {
    // Don't auto-login, just redirect to login page
    setShowSignUp(false);
    toast.success(`Account created successfully!`, {
      description: 'Please sign in with your credentials to continue.',
    });
  };

  // Show sign-up page
  if (!isLoggedIn && showSignUp) {
    return (
      <SignUpPage
        onSignUp={handleSignUp}
        onSwitchToLogin={() => setShowSignUp(false)}
      />
    );
  }

  // Show login page if not logged in
  if (!isLoggedIn) {
    return (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToSignUp={() => setShowSignUp(true)}
      />
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-[#0F1115] to-[#15181E]">
        <Toaster position="top-right" theme="dark" richColors />
        <TopBar 
          onAddTaskClick={() => setIsAddTaskDialogOpen(true)} 
          currentUser={currentUser}
          onLogout={() => {
            setIsLoggedIn(false);
            setCurrentUser(null);
            toast.success('Logged out successfully');
          }}
        />

        {/* Main Content */}
        <div className="max-w-[1600px] mx-auto px-8 py-8">
          {/* Mode Toggle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-12"
          >
            <div className="inline-flex rounded-2xl bg-[#1C1F26] border border-[#232834] p-1.5">
              <button
                onClick={() => setMode('solo')}
                className={`relative px-8 py-2.5 rounded-xl transition-all duration-200 ${
                  mode === 'solo'
                    ? 'text-white'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                {mode === 'solo' && (
                  <motion.div
                    layoutId="mode-indicator"
                    className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">Solo Mode</span>
              </button>
              
              <button
                onClick={() => setMode('team')}
                className={`relative px-8 py-2.5 rounded-xl transition-all duration-200 ${
                  mode === 'team'
                    ? 'text-white'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                {mode === 'team' && (
                  <motion.div
                    layoutId="mode-indicator"
                    className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">Team Mode</span>
              </button>
            </div>
          </motion.div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            {mode === 'solo' ? (
              <motion.div
                key="solo"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="space-y-12"
              >
                {/* Welcome Banner */}
                <WelcomeBanner />

                {/* Stats Overview */}
                <StatsOverview 
                  completedCount={completedCount}
                  inProgressCount={inProgressCount}
                  pendingCount={pendingCount}
                />

                {/* Navigation Tabs */}
                <div className="flex justify-center">
                  <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
                </div>

                {/* Conditional Content based on activeTab */}
                {activeTab === 'schedule' ? (
                  <SchedulePage />
                ) : activeTab === 'projects' ? (
                  <>
                    {/* Solo Mode Graphs */}
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-white mb-2">Productivity Analytics</h2>
                        <p className="text-white/50">
                          Track your personal productivity and task completion trends.
                        </p>
                      </div>
                      <SoloModeGraphs />
                    </div>

                    {/* Daily Timeline */}
                    <DailyTimeline />

                    {/* Task Section */}
                    <div className="space-y-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-white mb-2">All My Tasks</h2>
                          <p className="text-white/50">
                            Managing your tasks is easy with TaskMate AI. Drag and drop to change status.
                          </p>
                        </div>
                        
                        {/* Category Summary Cards and Bell Icon */}
                        <div className="flex items-center gap-3">
                          <CategorySummary 
                            category="Personal" 
                            totalTasks={personalTasks.length} 
                            completedTasks={personalCompleted} 
                            index={0} 
                          />
                          <CategorySummary 
                            category="Business" 
                            totalTasks={businessTasks.length} 
                            completedTasks={businessCompleted} 
                            index={1} 
                          />
                          <RemindersPopover />
                        </div>
                      </div>

                      {/* Large Container Box Around All Columns */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="relative rounded-3xl bg-[#1A1D24] border border-[#232834] p-6"
                      >
                        {/* 3 Column Kanban Layout - Solo Mode: Only "You" tasks */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Completed Column */}
                          <DroppableColumn status="Completed" onDrop={handleTaskDrop} color="green">
                            <div className="relative">
                              <div className="absolute inset-0 bg-green-500/5 rounded-2xl -z-10" />
                              
                              <div className="space-y-4 p-4">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C1F26]/80 border border-green-500/20">
                                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                  <h3 className="text-white/90">Completed</h3>
                                  <span className="text-green-400 text-sm ml-2">
                                    {soloTasks.filter(t => t.status === 'Completed').length}
                                  </span>
                                </div>
                                <div className="space-y-3">
                                  {soloTasks
                                    .filter(task => task.status === 'Completed')
                                    .map((task, index) => (
                                      <DraggableTaskCard key={task.id} taskId={task.id} status={task.status}>
                                        <CompletedTaskCard
                                          title={task.title}
                                          description={task.description}
                                          completedBy={task.completedBy || 'You'}
                                          index={index}
                                          onDelete={() => handleDeleteTask(task.id)}
                                          onClick={() => handleTaskClick(task)}
                                        />
                                      </DraggableTaskCard>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </DroppableColumn>

                          {/* In Progress Column */}
                          <DroppableColumn status="In Progress" onDrop={handleTaskDrop} color="purple">
                            <div className="relative">
                              <div className="absolute inset-0 bg-purple-500/5 rounded-2xl -z-10" />
                              
                              <div className="space-y-4 p-4">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C1F26]/80 border border-purple-500/20">
                                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                  <h3 className="text-white/90">In Progress</h3>
                                  <span className="text-purple-400 text-sm ml-2">
                                    {soloTasks.filter(t => t.status === 'In Progress').length}
                                  </span>
                                </div>
                                <div className="space-y-3">
                                  {soloTasks
                                    .filter(task => task.status === 'In Progress')
                                    .map((task, index) => (
                                      <DraggableTaskCard key={task.id} taskId={task.id} status={task.status}>
                                        <InProgressTaskCard
                                          title={task.title}
                                          description={task.description}
                                          scheduledTime={task.scheduledTime || ''}
                                          startedAt={task.startedAt || ''}
                                          assignee={task.assignee || 'You'}
                                          initialProgress={task.progress || 0}
                                          imageUrl={task.imageUrl}
                                          isShared={task.isShared}
                                          index={index}
                                          onDelete={() => handleDeleteTask(task.id)}
                                          onClick={() => handleTaskClick(task)}
                                        />
                                      </DraggableTaskCard>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </DroppableColumn>

                          {/* Pending Column */}
                          <DroppableColumn status="Pending" onDrop={handleTaskDrop} color="orange">
                            <div className="relative">
                              <div className="absolute inset-0 bg-orange-500/5 rounded-2xl -z-10" />
                              
                              <div className="space-y-4 p-4">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C1F26]/80 border border-orange-500/20">
                                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                  <h3 className="text-white/90">Pending</h3>
                                  <span className="text-orange-400 text-sm ml-2">
                                    {soloTasks.filter(t => t.status === 'Pending').length}
                                  </span>
                                </div>
                                <div className="space-y-3">
                                  {soloTasks
                                    .filter(task => task.status === 'Pending')
                                    .map((task, index) => (
                                      <DraggableTaskCard key={task.id} taskId={task.id} status={task.status}>
                                        <PendingTaskCard
                                          title={task.title}
                                          description={task.description}
                                          scheduledDate={task.scheduledDate || ''}
                                          scheduledTime={task.scheduledTime || ''}
                                          assignee={task.assignee || 'You'}
                                          imageUrl={task.imageUrl}
                                          isShared={task.isShared}
                                          index={index}
                                          showAssignee={false}
                                          onDelete={() => handleDeleteTask(task.id)}
                                          onClick={() => handleTaskClick(task)}
                                        />
                                      </DraggableTaskCard>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </DroppableColumn>
                        </div>
                      </motion.div>
                    </div>

                    {/* Behavior Study and Advices - Solo Mode */}
                    <BehaviorStudyAdvices />

                    {/* Daily Report Analysis - Solo Mode - Moved to End */}
                    <DailyReportAnalysis tasks={soloTasks} mode="solo" />
                  </>
                ) : null}
              </motion.div>
            ) : (
              <motion.div
                key="team"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="space-y-12"
              >
                {/* Team Analytics Graphs */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-white mb-2">Team Analytics</h2>
                    <p className="text-white/50">
                      Visual insights into team performance and task distribution.
                    </p>
                  </div>
                  <TeamModeGraphs />
                </div>

                {/* Enhanced Prediction Intelligence */}
                <EnhancedPredictionIntelligence />

                {/* Team Performance Dashboard */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-white mb-2">Team Performance</h2>
                    <p className="text-white/50">
                      Track progress and identify blockers across your team.
                    </p>
                  </div>

                  <TeamDashboard />
                </div>

                {/* Team Tasks - 3 Column Kanban */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-white mb-2">All Team Tasks</h2>
                    <p className="text-white/50">
                      Overview of all tasks across the team. Drag and drop to update status.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Completed Column */}
                    <DroppableColumn status="Completed" onDrop={handleTaskDrop} color="green">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <h3 className="text-white/80">Completed</h3>
                          <span className="text-white/40 text-sm ml-auto">
                            {tasks.filter(t => t.status === 'Completed').length}
                          </span>
                        </div>
                        <div className="space-y-3">
                          {tasks
                            .filter(task => task.status === 'Completed')
                            .map((task, index) => (
                              <DraggableTaskCard key={task.id} taskId={task.id} status={task.status}>
                                <CompletedTaskCard
                                  title={task.title}
                                  description={task.description}
                                  completedBy={task.completedBy || 'You'}
                                  index={index}
                                  onDelete={() => handleDeleteTask(task.id)}
                                  onClick={() => handleTaskClick(task)}
                                />
                              </DraggableTaskCard>
                            ))}
                        </div>
                      </div>
                    </DroppableColumn>

                    {/* In Progress Column */}
                    <DroppableColumn status="In Progress" onDrop={handleTaskDrop} color="purple">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2">
                          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                          <h3 className="text-white/80">In Progress</h3>
                          <span className="text-white/40 text-sm ml-auto">
                            {tasks.filter(t => t.status === 'In Progress').length}
                          </span>
                        </div>
                        <div className="space-y-3">
                          {tasks
                            .filter(task => task.status === 'In Progress')
                            .map((task, index) => (
                              <DraggableTaskCard key={task.id} taskId={task.id} status={task.status}>
                                <InProgressTaskCard
                                  title={task.title}
                                  description={task.description}
                                  scheduledTime={task.scheduledTime || ''}
                                  startedAt={task.startedAt || ''}
                                  assignee={task.assignee || 'You'}
                                  initialProgress={task.progress || 0}
                                  index={index}
                                  onDelete={() => handleDeleteTask(task.id)}
                                  onClick={() => handleTaskClick(task)}
                                />
                              </DraggableTaskCard>
                            ))}
                        </div>
                      </div>
                    </DroppableColumn>

                    {/* Pending Column (Team: all tasks with assignee shown) */}
                    <DroppableColumn status="Pending" onDrop={handleTaskDrop} color="orange">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2">
                          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          <h3 className="text-white/80">Pending</h3>
                          <span className="text-white/40 text-sm ml-auto">
                            {tasks.filter(t => t.status === 'Pending').length}
                          </span>
                        </div>
                        <div className="space-y-3">
                          {tasks
                            .filter(task => task.status === 'Pending')
                            .map((task, index) => (
                              <DraggableTaskCard key={task.id} taskId={task.id} status={task.status}>
                                <PendingTaskCard
                                  title={task.title}
                                  description={task.description}
                                  scheduledDate={task.scheduledDate || ''}
                                  scheduledTime={task.scheduledTime || ''}
                                  assignee={task.assignee || 'You'}
                                  index={index}
                                  showAssignee={true}
                                  onDelete={() => handleDeleteTask(task.id)}
                                  onClick={() => handleTaskClick(task)}
                                />
                              </DraggableTaskCard>
                            ))}
                        </div>
                      </div>
                    </DroppableColumn>
                  </div>
                </div>

                {/* Behavior Study and Advices - Team Mode */}
                <BehaviorStudyAdvices />

                {/* Daily Report Analysis - Team Mode - Moved to End */}
                <DailyReportAnalysis tasks={tasks} mode="team" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced AI Chat Button - Available in both modes */}
        <EnhancedAIChatButton currentMode={mode} tasks={tasks} />

        {/* Task Completion Overlay */}
        <TaskCompletionOverlay
          isVisible={showCompletionOverlay}
          taskTitle={completedTaskTitle}
          progressPercentage={72}
          onComplete={() => setShowCompletionOverlay(false)}
        />

        {/* Thanos Snap Overlay */}
        <ThanosSnapOverlay
          isVisible={showThanosSnap}
          taskTitle={snapTaskTitle}
          nextTaskTitle={nextTask?.title}
          nextTaskDate={nextTask?.date}
          nextTaskTime={nextTask?.time}
          onComplete={() => {
            setShowThanosSnap(false);
            setSnapTaskTitle('');
            setNextTask(null);
          }}
        />

        {/* Add Task Dialog */}
        <AddTaskDialog
          isOpen={isAddTaskDialogOpen}
          onClose={() => setIsAddTaskDialogOpen(false)}
          onAddTask={handleAddTask}
          mode={mode}
        />

        {/* Task Detail Dialog */}
        <TaskDetailDialog
          task={selectedTask}
          isOpen={isTaskDetailOpen}
          onClose={() => {
            setIsTaskDetailOpen(false);
            setSelectedTask(null);
          }}
        />
      </div>
    </DndProvider>
  );
}