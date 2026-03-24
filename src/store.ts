import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './features/auth/slices/authSlice'
import sidebarReducer from './layouts/slices/sidebarSlice'
import usersReducer from './features/create-users/slices/userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  sidebar: sidebarReducer,
  users: usersReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], 
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

const persistor = persistStore(store)

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

/**
 * Configuración central de Redux Store con persistencia.
 * - Usa Redux Toolkit (`configureStore`) para simplificar setup.
 * - Aplica persistencia con `redux-persist` para mantener el estado de `auth` entre sesiones.
 * - Combina los reducers principales: `auth`, `sidebar`, etc.
 */
export { store, persistor };
export type { RootState, AppDispatch };