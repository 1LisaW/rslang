import React, { useState, useCallback, useEffect } from 'react';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { IconButton } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth } from '../store/authFetch';
import { AppDispatch } from '../store/store';
import StorageWorker from '../../localStorage';
import type {} from 'redux-thunk/extend-redux';
import ModalPopup from './ModalFormAuth/modalFormAuth';
import { isAuth, getCurrentUserId } from '../store/authSlice';
import AccountMenu from './LogOut/logOut';

function Authorization() {
  const isAuthorized = useSelector(isAuth);
  const currentUserId = useSelector(getCurrentUserId);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    console.log('currentUserId ', currentUserId);
    dispatch(fetchAuth(StorageWorker.userId));
  }, [dispatch, currentUserId]);
  const navigate = useNavigate();
  const location = useLocation();

  const [confirmOpen, setConfirmOpen] = useState(false);

  const openModal = useCallback(() => {
    setConfirmOpen(openState => !openState);
  }, [confirmOpen]);

  const onCloseModal = useCallback(() => {
    console.log('location from auth ', location);
    navigate(location.pathname);
  }, [location.pathname]);

  const icon = isAuthorized ? (
    <AccountMenu />
  ) : (
    <NoAccountsIcon fontSize="large" sx={{ color: 'gray' }} />
  );

  return (
    <div>
      {isAuthorized ? (
        <IconButton onClick={openModal}>{icon}</IconButton>
      ) : (
        <IconButton component={Link} to="#logIn" onClick={openModal}>
          {icon}
        </IconButton>
      )}

      {!isAuthorized &&
        (location.hash === '#logIn' || location.hash === '#signUp') && (
          <ModalPopup onClose={onCloseModal} />
      )}
    </div>
  );
}

export default Authorization;
