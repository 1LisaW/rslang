import React from 'react';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { pink } from '@mui/material/colors';

type Props = { icons: boolean[] };

function IconStatusList(props: Props) {
  const { icons } = props;
  console.log('icons ', icons);
  const success = <InsertEmoticonIcon fontSize="small" color="success" />;
  const fail = (
    <SentimentVeryDissatisfiedIcon fontSize="small" sx={{ color: pink[500] }} />
  );
  return <>{icons.map((item: boolean) => (item ? success : fail))}</>;
}

export default IconStatusList;
