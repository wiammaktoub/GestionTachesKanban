import { useState } from "react";
import { Task } from "../shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "../lib/queryClient";
import { AlertCircle } from "lucide-react";
import TaskCard from "./task-card";

type ColumnType = {
  id: string;
  title: string;
  color: string;
};

const columns: ColumnType[] = [
  { id: "todo", title: "À faire", color: "bg-amber-400" },
  { id: "inprogress", title: "En cours", color: "bg-blue-400" },
  { id: "done", title: "Terminé", color: "bg-green-500" }
];

interface KanbanBoardProps {
  tasks: Task[];
  isLoading: boolean;
  onEditTask: (task: Task) => void;
}

export default function KanbanBoard({ tasks, isLoading, onEditTask }: KanbanBoardProps) {
  const [draggingTask, setDraggingTask] = useState<Task | null>(null);
  
  const updateTaskMutation = useMutation({
    mutationFn: async (task: Task) => {
      const res = await apiRequest("PATCH", `/api/tasks/${task.id}`, task);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
  });

  const handleDragStart = (task: Task) => {
    setDraggingTask(task);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-gray-50");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("bg-gray-50");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, statusColumn: string) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-gray-50");
    
    if (draggingTask && draggingTask.status !== statusColumn) {
      const updatedTask = { ...draggingTask, status: statusColumn };
      updateTaskMutation.mutate(updatedTask);
    }
    setDraggingTask(null);
  };

  const getColumnTasks = (columnId: string) => {
    return tasks.filter(task => task.status === columnId);
  };

  if (isLoading) {
    return (
      <div className="kanban-container grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center mb-4">
              <span className={`w-3 h-3 ${column.color} rounded-full mr-2`}></span>
              <h3 className="text-sm font-medium text-gray-900">{column.title}</h3>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 animate-pulse h-24 rounded-md"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Aucune tâche trouvée</h3>
          <p className="text-gray-500 mt-2">Créez une nouvelle tâche pour commencer.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="kanban-container grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((column) => {
        const columnTasks = getColumnTasks(column.id);
        
        return (
          <div key={column.id} className="bg-white rounded-lg shadow">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <h3 className="text-sm font-medium text-gray-900 flex items-center">
                <span className={`w-3 h-3 ${column.color} rounded-full mr-2`}></span>
                {column.title}
                <span className="ml-2 text-gray-500 text-xs font-normal">({columnTasks.length})</span>
              </h3>
            </div>
            
            <div 
              className="p-4 space-y-3 min-h-[12rem]"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {columnTasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onDragStart={() => handleDragStart(task)}
                  onClick={() => onEditTask(task)}
                />
              ))}
              
              {columnTasks.length === 0 && (
                <div className="text-center py-8 text-gray-400 text-sm">
                  Déposez vos tâches ici
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}