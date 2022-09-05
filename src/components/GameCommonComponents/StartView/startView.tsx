import * as React from 'react';
import Box from '@mui/material/Box';
import { Container, IconButton, Typography } from '@mui/material';
import {
  Filter1,
  Filter2,
  Filter3,
  Filter4,
  Filter5,
  Filter6,
} from '@mui/icons-material';

const actions = [
  { icon: <Filter1 />, value: 0 },
  { icon: <Filter2 />, value: 1 },
  { icon: <Filter3 />, value: 2 },
  { icon: <Filter4 />, value: 3 },
  { icon: <Filter5 />, value: 4 },
  { icon: <Filter6 />, value: 5 },
];

type ChooseGroupHandler = (groupIdx: number) => void;
type Props = { chooseGroupHandler: ChooseGroupHandler };

export default function StartView(props: Props) {
  const { chooseGroupHandler } = props;
  return (
    <Container className="content" maxWidth="md" sx={{ maxHeight: '80%' }}>
      <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          color="textSecondary"
          className="content__title"
        >
          Выберите категорию сложности:
        </Typography>
        <Box className="sprint-group">
          {actions.map((action) => (
            <IconButton
              className="sprint-group-selector"
              key={action.value}
              onClick={() => {
                chooseGroupHandler(action.value);
              }}
            >
              {action.icon}
            </IconButton>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
