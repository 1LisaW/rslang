import React from 'react';
import { IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PauseIcon from '@mui/icons-material/Pause';

type Handler = (file: Array<string>) => void;
export interface IAudio {
  handlerPlay: Handler;
  handlerPause: Handler;
  file: Array<string>;
  playItem: boolean
}

function AudioButton({ handlerPlay, handlerPause, file, playItem }: IAudio) {
  return (
    <IconButton onClick={() => {
      if (!playItem) {
        handlerPlay(file);
      } else {
        handlerPause(file);
      }
    }}
    >
      {playItem ? (
        <PauseIcon />
      ) : (
        <VolumeUpIcon />
      )}
    </IconButton>
  );
}

export default AudioButton;
