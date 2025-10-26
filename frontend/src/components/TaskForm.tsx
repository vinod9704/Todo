import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, X, CheckSquare, Sparkles } from "lucide-react";

interface TaskFormProps {
  onSubmit: (title: string, description: string) => void;
  initialTitle?: string;
  initialDescription?: string;
  isEditing?: boolean;
  onCancel?: () => void;
}

const TaskForm = ({
  onSubmit,
  initialTitle = "",
  initialDescription = "",
  isEditing = false,
  onCancel,
}: TaskFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title, description);
      if (!isEditing) {
        setTitle("");
        setDescription("");
      }
    }
  };

  return (
    <Card className="glass-card p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow rounded-lg blur-lg opacity-50 animate-pulse-slow"></div>
          <div className="relative bg-gradient-to-r from-primary to-primary-glow p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">
            {isEditing ? "Edit Task" : "Create New Task"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isEditing ? "Update your task details" : "Add a new task to your list"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Task Title *
          </label>
          <Input
            id="title"
            type="text"
            placeholder="Enter a compelling task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-12 text-lg transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary bg-muted/50 border-muted-foreground/20"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Description
          </label>
          <Textarea
            id="description"
            placeholder="Add detailed information about your task..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[120px] text-base transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary bg-muted/50 border-muted-foreground/20 resize-none"
          />
        </div>
        
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            className="flex-1 h-12 bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-base font-semibold"
          >
            {isEditing ? (
              <>
                <CheckSquare className="w-5 h-5 mr-2" />
                Update Task
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 mr-2" />
                Create Task
              </>
            )}
          </Button>
          {isEditing && onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="h-12 px-6 transition-all hover:bg-destructive/10 hover:border-destructive hover:text-destructive border-muted-foreground/20"
            >
              <X className="w-5 h-5 mr-2" />
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};

export default TaskForm;
