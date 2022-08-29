import * as React from 'react';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any>;
    },
    ref: React.Ref<unknown>,
  ) => <Slide direction="up" ref={ref} {...props} />,
);

export default function AlertDialogSlideOnClose() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseGame = () => {
    setOpen(false);
    navigate('/');
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen} className="sprint__close-button">
        <HighlightOffIcon sx={{ fontSize: 40 }} />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Вы уверены, что хотите выйти?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Если вы завершите игру, статистика по пройденным словам не
            сохранится. Вы по прежнему хотите завершить игру?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Остаться</Button>
          <Button onClick={handleCloseGame}>Выйти</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
