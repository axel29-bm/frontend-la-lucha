import api from '../../../shared/services/api';
import type { UserRegistrationData, UserRegistrationResponse } from '../types/userTypes';

import { REGISTER_USER_URL } from '../../../shared/constants/environment'; 

/**
 * Envía los datos de un nuevo usuario a la API para su registro.
 * @param userData - Objeto con los datos del usuario a registrar.
 * @returns La respuesta de la API.
 */
export const registerUser = async (
  userData: UserRegistrationData
): Promise<UserRegistrationResponse> => {
  const response = await api.post<UserRegistrationResponse>(REGISTER_USER_URL, userData);

  if (response.data.code !== 200) {
    throw new Error(response.data.message || 'Error al registrar el usuario');
  }

  return response.data;
};