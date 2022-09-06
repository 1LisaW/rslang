import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './CircularStatic.scss';

const GAME_TIME_INTERVAL = 60;

function CircularProgressWithLabel(
  props: CircularProgressProps & {
    value: number;
  },
) {
  const innerProps = { ...props };
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        {...props}
        size={150}
        className="sprint-game-icon"
        sx={{
          height: '150px',
          width: '150px',
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
type CircularStaticProps = { onFinish: () => void };
export default function CircularStatic(props: CircularStaticProps) {
  const { onFinish } = props;
  const [progress, setProgress] = React.useState(100);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const step = 100 / GAME_TIME_INTERVAL;
      if (progress <= 0) {
        onFinish();
        return;
      }
      setProgress(prevProgress => Math.max(0, prevProgress - step));
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [progress]);

  return <CircularProgressWithLabel value={progress} />;
}
