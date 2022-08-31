import React from 'react';
import { IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

type Handler = (play: boolean, file: string) => void;
interface IAudio {
  play: boolean;
  handler: Handler;
  file: string;
}

function AudioButton({ play, handler, file }: IAudio) {
  return (
    <IconButton onClick={() => handler(play, file)}>
      {play ?
        <VolumeUpIcon />
        :
        <VolumeOffIcon />}
    </IconButton>
  );
}

export default AudioButton;
