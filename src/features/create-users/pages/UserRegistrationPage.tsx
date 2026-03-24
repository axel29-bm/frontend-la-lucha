import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '../hooks/useRegistration';
import RegistrationForm from '../components/organisms/RegistrationForm';
import type { UserRegistrationData } from '../types/userTypes';
import { CButton, CCard, CCardBody } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCheckCircle, cilArrowLeft, cilUserPlus } from '@coreui/icons';

const UserRegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserRegistrationData>({
    username: '',
    fullName: '',
    email: '',
    password: '',
  });

  const { handleRegister, isLoading, isSuccess, error, resetStatus } = useRegistration();

  useEffect(() => {
    return () => {
      resetStatus();
    }
  }, [resetStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister(formData);
  };

  if (isSuccess) {
    return (
      <div className="d-flex justify-content-center mt-4">
        <CCard className="lucha-success-card" style={{ maxWidth: 480, width: '100%' }}>
          <CCardBody className="p-5 text-center">
            <div className="lucha-success-icon mb-3">
              <CIcon icon={cilCheckCircle} size="3xl" />
            </div>
            <h4 className="lucha-users-title mb-2">¡Usuario registrado!</h4>
            <p className="text-body-secondary mb-4">
              El nuevo usuario fue creado exitosamente en el sistema de La Lucha.
            </p>
            <div className="d-flex gap-2 justify-content-center">
              <CButton
                className="lucha-btn-outline"
                onClick={() => navigate('/users-list')}
              >
                <CIcon icon={cilArrowLeft} className="me-2" />
                Ver usuarios
              </CButton>
              <CButton
                className="lucha-btn-submit"
                onClick={resetStatus}
              >
                <CIcon icon={cilUserPlus} className="me-2" />
                Registrar otro
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </div>
    );
  }

  return (
    <RegistrationForm
      onSubmit={handleSubmit}
      onChange={handleChange}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default UserRegistrationPage;