import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import TaskForm from "@/components/TaskForm";
import TaskItem, { Task } from "@/components/TaskItem";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, CheckCircle2, Clock, List, Target, Zap, TrendingUp } from "lucide-react";
import { taskApi } from "@/api/taskApi";

type FilterType = "all" | "completed" | "pending";

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("all");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { toast } = useToast();

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskApi.getAllTasks();
      setTasks(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch tasks. Make sure your backend is running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (title: string, description: string) => {
    try {
      const newTask = await taskApi.createTask(title, description);
      setTasks([newTask, ...tasks]);
      toast({
        title: "Success",
        description: "Task added successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add task. Check your backend connection.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTask = async (title: string, description: string) => {
    if (!editingTask) return;
    
    try {
      const updated = await taskApi.updateTask(editingTask._id, { title, description });
      setTasks(tasks.map((task) => (task._id === updated._id ? updated : task)));
      setEditingTask(null);
      toast({
        title: "Success",
        description: "Task updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task.",
        variant: "destructive",
      });
    }
  };

  const handleToggleTask = async (id: string) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;

    try {
      const updated = await taskApi.toggleTask(id, !task.completed);
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task status.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await taskApi.deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
      toast({
        title: "Success",
        description: "Task deleted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task.",
        variant: "destructive",
      });
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-6">
            <Zap className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              {stats.total > 0 ? `${completionRate}% Complete` : "Ready to start"}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
              Your Tasks
            </span>
            <br />
            <span className="text-foreground">Await Your Command</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your productivity with our intelligent task management system. 
            Every completed task brings you closer to your goals.
          </p>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="glass-card p-6 hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-primary to-primary-glow p-3 rounded-xl">
                  <List className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Total Tasks</p>
                <p className="text-3xl font-bold text-foreground">{stats.total}</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6 hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-success to-success/80 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-success to-success/80 p-3 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-success-foreground" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Completed</p>
                <p className="text-3xl font-bold text-success">{stats.completed}</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6 hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-orange-500 to-orange-400 p-3 rounded-xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Pending</p>
                <p className="text-3xl font-bold text-orange-400">{stats.pending}</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6 hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-blue-400 p-3 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Progress</p>
                <p className="text-3xl font-bold text-blue-400">{completionRate}%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Task Form */}
        <div className="mb-12">
          {editingTask ? (
            <TaskForm
              onSubmit={handleUpdateTask}
              initialTitle={editingTask.title}
              initialDescription={editingTask.description}
              isEditing
              onCancel={() => setEditingTask(null)}
            />
          ) : (
            <TaskForm onSubmit={handleAddTask} />
          )}
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <Tabs value={filter} onValueChange={(value) => setFilter(value as FilterType)}>
            <TabsList className="glass-card grid w-full md:w-[500px] grid-cols-3 bg-muted/20 p-1">
              <TabsTrigger 
                value="all" 
                className="transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
              >
                <Target className="w-4 h-4 mr-2" />
                All Tasks
              </TabsTrigger>
              <TabsTrigger 
                value="completed" 
                className="transition-all data-[state=active]:bg-success data-[state=active]:text-success-foreground data-[state=active]:shadow-lg"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Completed
              </TabsTrigger>
              <TabsTrigger 
                value="pending" 
                className="transition-all data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                <Clock className="w-4 h-4 mr-2" />
                Pending
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Task List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow rounded-full blur-lg opacity-50 animate-pulse-slow"></div>
              <div className="relative bg-gradient-to-r from-primary to-primary-glow p-4 rounded-full">
                <Loader2 className="w-8 h-8 animate-spin text-primary-foreground" />
              </div>
            </div>
            <p className="text-muted-foreground mt-6 text-lg">Loading your tasks...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <Card className="glass-card p-16 text-center">
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow rounded-full blur-lg opacity-30 animate-pulse-slow"></div>
                <div className="relative bg-gradient-to-r from-primary to-primary-glow p-6 rounded-full">
                  <CheckCircle2 className="w-16 h-16 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">No tasks found</h3>
                <p className="text-muted-foreground text-lg">
                  {filter === "all"
                    ? "Ready to create your first task? Let's get started!"
                    : `No ${filter} tasks yet. Keep going!`}
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task, index) => (
              <div 
                key={task._id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TaskItem
                  task={task}
                  onToggle={handleToggleTask}
                  onEdit={setEditingTask}
                  onDelete={handleDeleteTask}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
