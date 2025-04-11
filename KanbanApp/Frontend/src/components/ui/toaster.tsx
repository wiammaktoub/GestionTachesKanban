import React from "react";
import { X } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-lg shadow-lg p-4 flex items-start gap-3 max-w-md animate-in fade-in slide-in-from-right
            ${toast.type === "destructive" || toast.type === "error" ? "bg-red-50 text-red-900 border border-red-200" :
              toast.type === "success" ? "bg-green-50 text-green-900 border border-green-200" :
                "bg-white text-gray-900 border border-gray-200"}`}
        >
          <div className="flex-1">
            <h3 className="font-semibold mb-1">{toast.title}</h3>
            {toast.description && <p className="text-sm opacity-90">{toast.description}</p>}
          </div>
          <button
            onClick={() => dismiss(toast.id)}
            className="text-gray-500 hover:text-gray-900"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}