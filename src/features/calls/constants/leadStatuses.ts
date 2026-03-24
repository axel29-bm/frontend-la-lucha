import type { LeadStatus } from '../types/callsTypes';

export const ALL_LEAD_STATUSES: LeadStatus[] = [
  { leadStatusId: 1, statusKey: 'Nuevo', descripcion: 'Nuevo lead sin contactar' },
  { leadStatusId: 2, statusKey: 'Contactando', descripcion: 'Intentando contactar al lead' },
  { leadStatusId: 3, statusKey: 'Contactado', descripcion: 'Se estableció contacto' },
  { leadStatusId: 4, statusKey: 'Calificado', descripcion: 'Lead calificado, listo para oportunidad' },
  { leadStatusId: 5, statusKey: 'OportunidadCreada', descripcion: 'Oportunidad de venta creada' },
  { leadStatusId: 6, statusKey: 'CerradoGanado', descripcion: 'Cierre exitoso, cliente adquirido' },
  { leadStatusId: 7, statusKey: 'OportunidadPerdida', descripcion: 'Oportunidad perdida' },
  { leadStatusId: 8, statusKey: 'NoCalificado', descripcion: 'No calificado / no es fit' },
  { leadStatusId: 9, statusKey: 'Nutrir', descripcion: 'Nutrir, seguir en el futuro' },
  { leadStatusId: 10, statusKey: 'Inactivo', descripcion: 'Inactivo / sin respuestas' },
  { leadStatusId: 11, statusKey: 'Descartado', descripcion: 'Descartado / inválido' },
];