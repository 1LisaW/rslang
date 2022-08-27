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
    <Button onClick={() => handler(action)}>
      <ThemeProvider theme={theme}>
        {action ? (
          <Button variant="text" className="button--active" color="primary">
            {text}
          </Button>
        ) : (
          <Button variant="contained" color="secondary">
            {text}
          </Button>
        )}
      </ThemeProvider>
    </Button>
  );
}

export default CardButtonActive;
