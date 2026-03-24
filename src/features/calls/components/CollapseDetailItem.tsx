import { cilChevronBottom, cilChevronTop } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CCollapse, CListGroupItem } from '@coreui/react';
import { useState } from 'react';

interface CollapsibleDetailItemProps {
  icon: any;
  label: string;
  children: React.ReactNode;
}

const CollapsibleDetailItem: React.FC<CollapsibleDetailItemProps> = ({ icon, label, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <CListGroupItem>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="d-flex align-items-center">
          <CIcon icon={icon} className="me-3 text-body-secondary" />
          <strong className="text-body-secondary">{label}</strong>
        </div>
        <CButton size="sm" onClick={() => setVisible(!visible)}>
          {visible ? 'Ocultar' : 'Mostrar'}
          <CIcon icon={visible ? cilChevronTop : cilChevronBottom} className="ms-2" />
        </CButton>
      </div>

      <CCollapse visible={visible}>
        <div className="p-3 mt-2 border-top bg-body-tertiary rounded">
          <p style={{ whiteSpace: 'pre-wrap', marginBottom: 0 }}>
            {children}
          </p>
        </div>
      </CCollapse>
    </CListGroupItem>
  );
};

export default CollapsibleDetailItem;