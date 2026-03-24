// Define los datos que se enviarán en el formulario de registro
export interface UserRegistrationData {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

export interface UserRegistrationResponse {
  code: number;
  message: string;
  data: {
    id: number;
    username: string;
    email: string;
  };
}

// Define el estado para el slice de Redux de este feature
export interface UserState {
  registrationStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}