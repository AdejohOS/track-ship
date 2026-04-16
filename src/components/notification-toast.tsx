"use client";

import { useEffect, useState } from "react";
import {
  X,
  CheckCircleIcon,
  AlertCircleIcon,
  InfoIcon,
  BellIcon,
} from "lucide-react";

interface Toast {
  id: string;
  title: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

let toastId = 0;

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (
    title: string,
    message: string,
    type: "success" | "error" | "info" | "warning" = "info",
  ) => {
    const id = String(toastId++);
    const newToast = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 5000);

    return id;
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return { toasts, addToast, removeToast };
};

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

export function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-lg p-4 shadow-lg border flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 ${
            toast.type === "success"
              ? "bg-green-50 border-green-200 text-green-900"
              : toast.type === "error"
                ? "bg-red-50 border-red-200 text-red-900"
                : toast.type === "warning"
                  ? "bg-yellow-50 border-yellow-200 text-yellow-900"
                  : "bg-blue-50 border-blue-200 text-blue-900"
          }`}
        >
          <div className="flex-shrink-0 mt-0.5">
            {toast.type === "success" && (
              <CheckCircleIcon className="w-5 h-5 text-green-600" />
            )}
            {toast.type === "error" && (
              <AlertCircleIcon className="w-5 h-5 text-red-600" />
            )}
            {toast.type === "warning" && (
              <AlertCircleIcon className="w-5 h-5 text-yellow-600" />
            )}
            {toast.type === "info" && (
              <InfoIcon className="w-5 h-5 text-blue-600" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">{toast.title}</p>
            <p className="text-sm opacity-90 mt-1">{toast.message}</p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
