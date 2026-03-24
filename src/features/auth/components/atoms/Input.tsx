import React from 'react'
import { CFormInput, CInputGroup, CInputGroupText } from '@coreui/react'

/**
 * Props extendidas del componente CFormInput, con un ícono opcional al inicio.
 */
type InputProps = React.ComponentProps<typeof CFormInput> & {
  icon?: React.ReactNode
}

/**
 * Input es un componente de formulario reutilizable que encapsula un campo de entrada
 * con soporte para íconos al inicio del input, utilizando CoreUI InputGroup.
 *
 * @param {InputProps} props - Props del input más un ícono opcional.
 */
const Input: React.FC<InputProps> = ({ icon, ...props }) => (
  <CInputGroup className="mb-3">
    {icon && <CInputGroupText>{icon}</CInputGroupText>}
    <CFormInput {...props} />
  </CInputGroup>
)

export default Input
