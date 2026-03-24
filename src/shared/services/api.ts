// src/shared/services/api.ts

import axios from 'axios'
import { store } from '../../store'
import { selectToken, logout } from '../../features/auth/slices/authSlice'
//import { customHistory } from '../utils/history'
import { toastService } from './toastService' 

const api = axios.create({
  baseURL: 'https://realstateaiagent.kfgestiondigital.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const state = store.getState()
    const token = selectToken(state)
    
    if (token) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => {
    const method = response.config.method?.toLowerCase();
    
    if (method === 'post' || method === 'put' || method === 'delete' || method === 'patch') {
      toastService.show('Operación realizada con éxito', 'success');
    }
  
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      toastService.show('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.', 'danger');
      store.dispatch(logout());
      window.location.href = '/login'; 
      
      return Promise.reject(error);
    }

    let errorMessage = 'Ocurrió un error inesperado.';

    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    toastService.show(errorMessage, 'danger');
    
    return Promise.reject(error);
  }
)

export default api