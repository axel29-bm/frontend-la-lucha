import api from '../../../shared/services/api'
import type { LoginResponse } from '../types/userTypes'

const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
      '/api/Auth/login',
      { email, password },
    )
    return response.data
  },
}

export default authService