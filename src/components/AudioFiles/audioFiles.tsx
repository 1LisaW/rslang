import React from 'react';
import { IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

type Handler = (play: boolean) => void;
interface IAudio {
  play: boolean,
  handler: Handler
}

function AudioButton({ play, handler }:IAudio) {
  return (
    <IconButton onClick={() => handler(play)}>
      {play ? <VolumeOffIcon /> : <VolumeUpIcon />}
    </IconButton>
  );
}

export default AudioButton;
