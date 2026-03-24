import React, { useState } from 'react';
import {
  CCollapse, CListGroupItem, CButton, CModal, CModalHeader, CModalBody,
  CModalFooter, CModalTitle, CForm, CFormSelect, CFormTextarea, CSpinner, CAlert
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilChevronBottom, cilChevronTop, cilPen } from '@coreui/icons';
import type { LeadStatus, UpdateLeadStatusPayload } from '../types/callsTypes';
import { updateLeadStatus } from '../services/callService';
import { ALL_LEAD_STATUSES } from '../constants/leadStatuses';

interface LeadStatusCollapsibleProps {
  callId: string;
  currentStatus: LeadStatus;
  onStatusUpdate: () => void;
  icon: React.ReactNode;
  label: string;
  startOpen?: boolean;
}

const LeadStatusCollapsibleSection: React.FC<LeadStatusCollapsibleProps> = ({
  callId,
  currentStatus,
  onStatusUpdate,
  icon,
  label,
  startOpen = false,
}) => {
  const [visible, setVisible] = useState(startOpen);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allStatuses] = useState<LeadStatus[]>(ALL_LEAD_STATUSES);
  const [selectedStatusId, setSelectedStatusId] = useState<number>(currentStatus.leadStatusId);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenModal = () => {
    setSelectedStatusId(currentStatus.leadStatusId);
    setComment('');
    setError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!comment.trim()) {
      setError("Por favor, escribe un comentario para cambiar el estado del lead.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    const payload: UpdateLeadStatusPayload = {
      leadStatusId: selectedStatusId,
      comment: comment,
    };

    try {
      await updateLeadStatus(callId, payload);
      setIsModalOpen(false);
      onStatusUpdate();
    } catch (err) {
      setError("Error al actualizar el estado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CListGroupItem>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <div className="d-flex align-items-center">
          <span className="me-3 text-body-secondary" style={{ display: 'inline-flex', alignItems: 'center' }}>
            {icon}
          </span>
            <strong className="text-body-secondary">{label}</strong>
          </div>
          <CButton size="sm" onClick={() => setVisible(!visible)}>
            {visible ? 'Ocultar' : 'Mostrar'}
            <CIcon icon={visible ? cilChevronTop : cilChevronBottom} className="ms-2" />
          </CButton>
        </div>

        <CCollapse visible={visible}>
          <div className="p-3 mt-2 border-top bg-body-tertiary rounded">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="fs-5 fw-bold text-dark mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                  {currentStatus.statusKey}
                </p>
                <p className="text-body-secondary mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                  {currentStatus.descripcion}
                </p>
              </div>
              <CButton color="primary" variant="outline" size="sm" onClick={handleOpenModal}>
                <CIcon icon={cilPen} className="me-2" />
                Cambiar
              </CButton>
            </div>
          </div>
        </CCollapse>
      </CListGroupItem>

      <CModal visible={isModalOpen} onClose={() => setIsModalOpen(false)} backdrop="static">
        <CModalHeader>
          <CModalTitle>Actualizar estado del lead</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {error && <CAlert color="danger">{error}</CAlert>}
          <CForm>
            <div className="mb-3">
              <label htmlFor="leadStatusSelect" className="form-label">Nuevo Estado</label>
              <CFormSelect
                id="leadStatusSelect"
                value={selectedStatusId}
                onChange={(e) => setSelectedStatusId(Number(e.target.value))}
              >
                {allStatuses.map(status => (
                  <option key={status.leadStatusId} value={status.leadStatusId}>{status.statusKey}</option>
                ))}
              </CFormSelect>
            </div>
            <div className="mb-3">
              <label htmlFor="statusComment" className="form-label">Comentario (requerido)</label>
              <CFormTextarea id="statusComment" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Añade un comentario sobre el cambio de estado..." />
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setIsModalOpen(false)} disabled={isLoading}>Cancelar</CButton>
          <CButton color="primary" onClick={handleSubmit} disabled={isLoading || !comment.trim()}>
            {isLoading ? <CSpinner size="sm" /> : 'Guardar cambios'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default LeadStatusCollapsibleSection;