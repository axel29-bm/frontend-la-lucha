import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../store';
import { performRegistration, selectRegistrationStatus, selectRegistrationError, resetRegistrationStatus } from '../slices/userSlice';
import type { UserRegistrationData } from '../types/userTypes';

export const useRegistration = () => {
  const dispatch = useDispatch<AppDispatch>();

  const status = useSelector(selectRegistrationStatus);
  const error = useSelector(selectRegistrationError);

  const handleRegister = (userData: UserRegistrationData) => {
    dispatch(performRegistration(userData));
  };

  const resetStatus = () => {
      dispatch(resetRegistrationStatus());
  }

  return {
    handleRegister,
    resetStatus,
    isLoading: status === 'loading',
    isSuccess: status === 'succeeded',
    error,
  };
};