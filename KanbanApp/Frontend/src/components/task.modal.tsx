import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "../lib/queryClient";
import { Task, InsertTask } from "../shared/schema";
import { useAuth } from "../hooks/use-auth";
import { X } from "lucide-react";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Partial<Task> | null;
}

export default function TaskModal({ isOpen, onClose, task }: TaskModalProps) {
  const { user } = useAuth();
  const isEditing = !!task?.id;
  
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "todo");
  const [priority, setPriority] = useState(task?.priority || "medium");
  const [category, setCategory] = useState(task?.category || "feature");
  const [dueDate, setDueDate] = useState(task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : "");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { data: users = [] } = useQuery<any[]>({
    queryKey: ["/api/users"],
    enabled: isOpen,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const taskData = {
        title,
        description,
        status,
        priority,
        category,
        userId: user?.id || 0,
        assigneeId: user?.id,
        dueDate: dueDate ? new Date(dueDate) : null,
      };
      
      if (isEditing && task?.id) {
        await apiRequest("PATCH", `/api/tasks/${task.id}`, { ...taskData, id: task.id });
      } else {
        await apiRequest("POST", "/api/tasks", taskData);
      }
      
      await queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la tâche:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!isEditing || !task?.id) return;
    
    setIsSubmitting(true);
    try {
      await apiRequest("DELETE", `/api/tasks/${task.id}`);
      await queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      onClose();
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">
            {isEditing ? "Modifier la tâche" : "Créer une nouvelle tâche"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Entrez le titre de la tâche"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Description de la tâche"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="feature">Fonctionnalité</option>
                  <option value="bug">Bug</option>
                  <option value="design">Design</option>
                  <option value="backend">Backend</option>
                  <option value="documentation">Documentation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priorité
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="low">Basse</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Haute</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assigné à
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value={user?.id}>
                    {user?.name} (Vous)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date d'échéance
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statut
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="todo">À faire</option>
                <option value="inprogress">En cours</option>
                <option value="done">Terminé</option>
              </select>
            </div>
          </div>

          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-between">
            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                disabled={isSubmitting}
              >
                Supprimer
              </button>
            )}
            <div>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors mr-2"
                disabled={isSubmitting}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
                disabled={isSubmitting}
              >
                {isEditing ? "Mettre à jour" : "Créer"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}