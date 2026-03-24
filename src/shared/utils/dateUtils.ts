/**
 * Convierte una fecha de formato ISO (`YYYY-MM-DD`) a formato `DD/MM/YYYY`.
 *
 * @param isoDate Fecha en formato ISO (por ejemplo: '2025-06-30').
 * @returns La fecha convertida en formato legible: `DD/MM/YYYY`.
 */
export function formatDateToDMY(isoDate: string): string {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}

/**
 * Retorna la fecha actual del sistema en formato ISO (`YYYY-MM-DD`).
 *
 * @returns Fecha de hoy como string en formato `YYYY-MM-DD`.
 */
export function getTodayISO(): string {
  const today = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
}
