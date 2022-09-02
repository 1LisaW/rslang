import React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type Handler = () => void;

interface IButtonCard {
  text: string;
  colorBtn: 'primary' | 'secondary';
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

function CardButtonActive({ text, colorBtn, handler }: IButtonCard) {
  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={handler}
        variant="text"
        className="button--active"
        color={colorBtn}
      >
        {text}
      </Button>
    </ThemeProvider>
  );
}

export default CardButtonActive;
