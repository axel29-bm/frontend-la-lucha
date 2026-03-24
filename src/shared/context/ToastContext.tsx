import React, { useState, createContext, type ReactNode } from 'react';
import { CToaster, CToast, CToastBody } from '@coreui/react';
import { toastService } from '../services/toastService';

interface Toast {
  id: number;
  message: string;
  color: 'success' | 'danger' | 'warning' | 'info';
}

const ToastContext = createContext({});

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, color: Toast['color']) => {
    const newToast: Toast = {
      id: Date.now(),
      message,
      color,
    };
    setToasts(prevToasts => [...prevToasts, newToast]);
  };
  
  React.useEffect(() => {
    toastService.setCallbacks(addToast);
  }, []);

  return (
    <ToastContext.Provider value={{}}>
      {children}
      <CToaster placement="bottom-end" className="p-3">
        {toasts.map((toast) => (
          <CToast key={toast.id} animation={true} autohide={true} delay={3000} visible={true} color={toast.color} className="text-white align-items-center">
            <div className="d-flex">
              <CToastBody>{toast.message}</CToastBody>
            </div>
          </CToast>
        ))}
      </CToaster>
    </ToastContext.Provider>
  );
};