import React from 'react';
import { IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PauseIcon from '@mui/icons-material/Pause';

type Handler = (file: Array<string>) => void;
export interface IAudio {
  handlerPlay: Handler;
  handlerPause: Handler;
  file: Array<string>;
  playCard: boolean
}

function AudioButton({ handlerPlay, handlerPause, file, playCard }: IAudio) {
  return (
    <IconButton onClick={() => {
      if (!playCard) {
        handlerPlay(file);
      } else {
        handlerPause(file);
      }
    }}
    >
      {playCard ? (
        <PauseIcon />
      ) : (
        <VolumeUpIcon />
      )}
    </IconButton>
  );
}

export default AudioButton;
