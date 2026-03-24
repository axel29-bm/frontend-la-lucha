import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { usePermissions } from '../../hooks/usePermissions';

interface ActionIconProps {
  icon: IconDefinition;
  tooltip: string;
  permission: [string, string, string];
  onClick: () => void;
}

const ActionIcon: React.FC<ActionIconProps> = ({ icon, tooltip, permission, onClick }) => {
  const { hasPermission } = usePermissions();
  if (!hasPermission(...permission)) return null;
  return (
    <span>
      <FontAwesomeIcon icon={icon} title={tooltip} style={{ cursor: 'pointer' }} onClick={onClick} />
    </span>
  );
};

export default ActionIcon;
