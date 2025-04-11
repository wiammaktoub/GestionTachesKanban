import { Task } from "../shared/schema";
import { formatDate, getCategoryColor, getPriorityColor } from "../lib/utils";
import { MoreVertical } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onDragStart: () => void;
  onClick: () => void;
}

export default function TaskCard({ task, onDragStart, onClick }: TaskCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Placeholder pour les initiales de l'assigné
  const assigneeInitials = "JD";

  return (
    <div 
      className="task-card p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow duration-200 cursor-pointer"
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(task.category)}`}>
          {task.category}
        </span>
        <div className="flex space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
          <button className="text-gray-400 hover:text-gray-500">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <h4 className="mt-2 text-sm font-medium text-gray-900">{task.title}</h4>
      
      {task.description && (
        <p className="mt-1 text-xs text-gray-500 line-clamp-2">{task.description}</p>
      )}
      
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
            {assigneeInitials}
          </div>
        </div>
        
        {task.dueDate && (
          <div className="text-xs text-gray-500">
            {task.status === "done" ? "Terminé: " : "Échéance: "}
            {formatDate(task.dueDate)}
          </div>
        )}
      </div>
    </div>
  );
}