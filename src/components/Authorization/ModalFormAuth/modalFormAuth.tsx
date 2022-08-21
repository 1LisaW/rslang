import React, { useState } from 'react';
import { Dialog } from '@mui/material';
import ModalFormAuthTabsPanel from './ModalFormAuthTabsPanel/modalFormAuthTabsPanel';
import './modalFormAuth.scss';

interface ModalProps {
  onClose: () => void;
}

function ModalFormAuth(props: ModalProps) {
  const { onClose } = props;
  const [open, setClose] = useState(true);
  const handleClose = () => {
    setClose(false);
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} className="popup">
      <ModalFormAuthTabsPanel />
    </Dialog>
  );
}

export default ModalFormAuth;
