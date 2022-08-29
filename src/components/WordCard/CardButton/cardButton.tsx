import React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type Handler = (play: boolean) => void;

interface IButtonCard {
  text: string;
  action: boolean;
  handler: Handler;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#41403f',
    },
    secondary: {
      main: '#cd7c43',
    },
  },
});

function CardButtonActive({ text, action, handler }: IButtonCard) {
  return (
    <ThemeProvider theme={theme}>
      {action ? (
        <Button
          onClick={() => handler(action)}
          variant="text"
          className="button--active"
          color="primary"
        >
          {text}
        </Button>
      ) : (
        <Button
          onClick={() => handler(action)}
          variant="contained"
          color="secondary"
        >
          {text}
        </Button>
      )}
    </ThemeProvider>
  );
}

export default CardButtonActive;
