import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './CircularStatic.scss';

const GAME_TIME_INTERVAL = 60;

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  const innerProps = { ...props };
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        {...props}
        size={100}
        sx={{
          height: '100px',
          width: '100px',
        }}
      />
      <Box className="sprint-game-timer">
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          fontSize={20}
        >
          {`${Math.round((GAME_TIME_INTERVAL * innerProps.value) / 100)}s`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function CircularStatic() {
  const [progress, setProgress] = React.useState(100);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const step = 100 / GAME_TIME_INTERVAL;
      setProgress(prevProgress => Math.max(0, prevProgress - step));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
}
