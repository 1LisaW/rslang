import React, { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import { Box } from '@mui/material';
import './gameButtons.scss';

type ButtonData = {
  text: string;
  value: string;
  className: string;
  isCorrect: boolean;
};

type ButtonsProps = {
  buttonsData: ButtonData[];
  changeCard: (valid: boolean) => void;
};

type ButtonProps = {
  buttonData: ButtonData;
  changeCard: (valid: boolean) => void;
};

type KeyProps = {
  key: string;
};

const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = (props: KeyProps) => {
    const { key } = props;
    if (key === targetKey) {
      setKeyPressed(true);
    }
  };
  const upHandler = (props: KeyProps) => {
    const { key } = props;
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', downHandler);
    document.addEventListener('keyup', upHandler);

    return () => {
      document.removeEventListener('keydown', downHandler);
      document.removeEventListener('keyup', upHandler);
    };
  });

  return keyPressed;
};

function CustomToggleButton(props: ButtonProps) {
  const { buttonData, changeCard } = props;
  return (
    <div>
      <ToggleButton
        className={buttonData.className}
        value={buttonData.value}
        onClick={() => {
          changeCard(buttonData.isCorrect);
        }}
      >
        {buttonData.text}
      </ToggleButton>
    </div>
  );
}

function GameButtons(props: ButtonsProps) {
  const { buttonsData, changeCard } = props;

  const rightPress = useKeyPress('ArrowRight');
  const leftPress = useKeyPress('ArrowLeft');
  const enterPress = useKeyPress('Enter');
  const [cursor, setCursor] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (buttonsData.length && rightPress) {
      setCursor(prevState => {
        if (prevState !== undefined) {
          return prevState < buttonsData.length - 1 ? prevState + 1 : prevState;
        }
        return 0;
      });
    }
  }, [rightPress]);
  useEffect(() => {
    if (buttonsData.length && leftPress) {
      setCursor(prevState => {
        if (prevState === undefined) return 0;
        return prevState > 0 ? prevState - 1 : prevState;
      });
    }
  }, [leftPress]);
  useEffect(() => {
    if (buttonsData.length && enterPress && cursor !== undefined) {
      changeCard(buttonsData[cursor].isCorrect);
    }
  }, [cursor, enterPress]);

  const gameButtons = buttonsData.map((item: ButtonData, idx: number) => {
    const itemWthClass = {
      ...item,
      className: idx === cursor ? `${item.className} active` : item.className,
    };
    const data: ButtonProps = { buttonData: itemWthClass, changeCard };
    return <CustomToggleButton key={data.buttonData.value} {...data} />;
  });

  return (
    <Box
      className="game-card__actions--group"
      onMouseEnter={() => setCursor(undefined)}
      onMouseLeave={() => setCursor(undefined)}
    >
      {gameButtons}
    </Box>
  );
}

export default GameButtons;
