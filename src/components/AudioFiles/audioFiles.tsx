import React from 'react';
import { IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useSelector } from 'react-redux';
import { isSoundPlaying } from '../store/soundPlaySlice';

type Handler = (file: Array<string>) => void;
export interface IAudio {
  play: boolean;
  handlerPlay: Handler;
  handlerPause: Handler;
  file: Array<string>;
}

function AudioButton({ play, handlerPlay, handlerPause, file }: IAudio) {
  if (play) {
    play = false;
    // console.log(play);
  }
  const isPlaying = useSelector(isSoundPlaying);
  return (
    <IconButton onClick={() => {
      if (!isPlaying) {
        handlerPlay(file);
        // play = false;
      } else {
        console.log('handler pause called');
        handlerPause(file);
        // play = true;
      }
    }}
    >
      {isPlaying ? (
        <VolumeOffIcon />
      ) : (
        <VolumeUpIcon />
      )}
    </IconButton>
  );
}

export default AudioButton;
