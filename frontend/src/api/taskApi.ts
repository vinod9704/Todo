import { Task } from "@/components/TaskItem";

// Base API URL - Update this to your backend URL
const API_BASE_URL = "https://todo-list-backend-wr5c.onrender.com/api";
// API client for task operations
export const taskApi = {
  // Fetch all tasks
  getAllTasks: async (): Promise<Task[]> => {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return response.json();
  },
  
  // Create a new task
  createTask: async (title: string, description: string): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, completed: false }),
    });
    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    return response.json();
  },

  // Update a task
  updateTask: async (
    id: string,
    updates: { title?: string; description?: string; completed?: boolean }
  ): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    return response.json();
  },

  // Toggle task completion status
  toggleTask: async (id: string, completed: boolean): Promise<Task> => {
    return taskApi.updateTask(id, { completed });
  },

  // Delete a task
  deleteTask: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
  },
};
