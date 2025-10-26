import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Edit, Trash2, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem = ({ task, onToggle, onEdit, onDelete }: TaskItemProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card
      className={cn(
        "glass-card p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group border-white/10",
        task.completed && "bg-success/5 border-success/20"
      )}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(task._id)}
          className="mt-1 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/30 rounded-full p-1"
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed ? (
            <div className="relative">
              <div className="absolute inset-0 bg-success rounded-full blur-lg opacity-50 animate-pulse-slow"></div>
              <CheckCircle2 className="relative w-7 h-7 text-success" />
            </div>
          ) : (
            <Circle className="w-7 h-7 text-muted-foreground hover:text-primary transition-colors" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <h3
                className={cn(
                  "text-xl font-bold transition-all mb-2",
                  task.completed && "line-through text-muted-foreground"
                )}
              >
                {task.title}
              </h3>
              
              {task.description && (
                <p
                  className={cn(
                    "text-muted-foreground mb-3 whitespace-pre-wrap leading-relaxed",
                    task.completed && "line-through opacity-60"
                  )}
                >
                  {task.description}
                </p>
              )}

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Created {formatDate(task.createdAt)}</span>
                </div>
                {task.completed && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Completed</span>
                  </div>
                )}
              </div>
            </div>
            
            {task.completed && (
              <Badge 
                variant="outline" 
                className="bg-success/10 text-success border-success/30 shrink-0 px-3 py-1"
              >
                ✓ Done
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(task)}
              className="transition-all hover:bg-primary/10 hover:border-primary hover:text-primary border-muted-foreground/20"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(task._id)}
              className="transition-all hover:bg-destructive/10 hover:border-destructive hover:text-destructive border-muted-foreground/20"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskItem;
