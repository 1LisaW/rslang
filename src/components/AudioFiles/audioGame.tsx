import React from 'react';
// import { IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

type Handler = (file: Array<string>) => void;
export interface IAudioGame {
  handlerPlay: Handler;
  file: Array<string>;
}

function AudioGame({ handlerPlay, file }: IAudioGame) {
  return (
    <VolumeUpIcon
      onClick={() => {
        handlerPlay(file);
      }}
    />
  );
}

export default AudioGame;
