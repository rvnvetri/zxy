import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const show = (message, type = "info") => {
    //alert(message);
    //alert(type);
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  const toast = {
    success: (msg) => show(msg, "success"),
    error: (msg) => show(msg, "error"),
    info: (msg) => show(msg, "info"),
    warning: (msg) => show(msg, "warning"),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="toast toast-bottom toast-end z-50">
        {toasts.map((t) => (
          <div key={t.id} className={`alert alert-${t.type} text-black shadow-lg`}>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
