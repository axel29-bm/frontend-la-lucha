
import type React from "react";
import { HashRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import NavigationProvider from "./shared/providers/NavigationProvider";
import { ToastProvider } from "./shared/context/ToastContext";

/**
 * Componente raíz de la aplicación.
 * - Encapsula la aplicación dentro del `HashRouter` para control de rutas basado en hash.
 * - Aplica opciones futuras de React Router (v7 features).
 * - Carga la definición de rutas desde `AppRoutes`.
 */
 const App: React.FC = () => {
  return (
    <HashRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ToastProvider>
        <NavigationProvider>
          <AppRoutes />
        </NavigationProvider>
      </ToastProvider>
    </HashRouter>
  );
};

export default App
