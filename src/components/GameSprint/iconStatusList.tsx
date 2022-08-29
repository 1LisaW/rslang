import React from 'react';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { pink } from '@mui/material/colors';

type Props = { icons: boolean[] };

function IconStatusList(props: Props) {
  const { icons } = props;
  return (
    <>
      {icons.slice(-5).map((item: boolean, idx: number) => {
        const success = (
          <InsertEmoticonIcon
            fontSize="small"
            color="success"
            key={`success${idx + 1}`}
          />
        );
        const fail = (
          <SentimentVeryDissatisfiedIcon
            fontSize="small"
            sx={{ color: pink[500] }}
            key={`fail${idx + 1}`}
          />
        );
        return item ? success : fail;
      })}
    </>
  );
}

export default IconStatusList;
