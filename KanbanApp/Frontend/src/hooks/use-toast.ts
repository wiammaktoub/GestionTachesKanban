import { useState } from "react";

type ToastType = "default" | "success" | "error" | "warning" | "info" | "destructive";

interface Toast {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = ({ 
    title, 
    description, 
    type = "default", 
    duration = 5000,
    variant
  }: {
    title: string;
    description?: string;
    type?: ToastType;
    duration?: number;
    variant?: string;
  }) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { id, title, description, type: variant === "destructive" ? "error" : type, duration };
    
    setToasts((prevToasts) => [...prevToasts, newToast]);

    if (duration !== Infinity) {
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
      }, duration);
    }

    return id;
  };

  const dismiss = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  };

  return { toast, dismiss, toasts };
}