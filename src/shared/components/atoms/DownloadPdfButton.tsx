import React from 'react'
import { CAvatar, CTooltip } from '@coreui/react'
import pafDownload from '../../../assets/img/pdf-dowload.png'

/**
 * Botón visual para descargar un archivo PDF.
 * - Utiliza un avatar con una imagen de ícono PDF como botón.
 * - Incluye un tooltip de CoreUI para mejorar la accesibilidad.
 *
 * @param onClick Función que se ejecuta al hacer clic sobre el botón.
 */
const DownloadPdfButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
    <div className="d-flex justify-content-end align-items-center mb-3">
        <CTooltip content="Descargar en PDF" placement="left">
            <CAvatar
                src={pafDownload}
                role="button"
                aria-label="Descargar PDF"
                style={{ cursor: 'pointer', background: 'white' }}
                onClick={onClick}
                size="md"
                className="shadow-sm"
            />
        </CTooltip>
    </div>
)

export default DownloadPdfButton
