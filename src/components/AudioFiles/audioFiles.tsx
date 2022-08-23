import React from 'react';
import { IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

type Handler = (play: boolean) => void;
// const audioPath = 'files/01_0606.mp3';
function AudioButton(play: boolean, handler: Handler) {
  return (
    <IconButton onClick={() => handler(play)}>
      {play ? <VolumeOffIcon /> : <VolumeUpIcon />}
    </IconButton>
  );
}

export default AudioButton;
