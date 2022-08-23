import React, { useState, useCallback } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { IconButton } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ModalPopup from './ModalFormAuth/modalFormAuth';

function Authorization() {
  const navigate = useNavigate();
  const location = useLocation();

  const [auth, setAuth] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const openModal = useCallback(() => {
    setConfirmOpen(openState => !openState);
  }, [confirmOpen]);

  const onCloseModal = useCallback(() => {
    navigate(location.pathname);
  }, [location.pathname]);

  const icon = auth ? (
    <AccountCircleIcon fontSize="large" sx={{ color: 'pink' }} />
  ) : (
    <NoAccountsIcon fontSize="large" sx={{ color: 'gray' }} />
  );

  console.log('setAuth ', setAuth);

  return (
    <div>
      <IconButton component={Link} to="#logIn" onClick={openModal}>
        {icon}
      </IconButton>
      {(location.hash === '#logIn' || location.hash === '#signUp') && (
        <ModalPopup onClose={onCloseModal} />
      )}
    </div>
  );
}

export default Authorization;
