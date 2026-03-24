import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
//import '@coreui/coreui/dist/css/coreui.min.css';
import './assets/styles/custom.css';
import './index.css';
import { persistor, store } from './store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.tsx'

/**
 * Punto de entrada principal de la aplicación React.
 * - Monta el componente raíz en el DOM.
 * - Envuelve la aplicación con Redux `Provider` y `PersistGate` para persistencia del estado.
 * - Usa `StrictMode` para advertencias de desarrollo.
 */

// Renderiza el árbol de componentes dentro del elemento #root
createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
