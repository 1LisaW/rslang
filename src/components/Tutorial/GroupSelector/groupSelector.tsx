import React from 'react';
// import React, { useCallback } from 'react';
// import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

import './groupSelector.scss';

interface GroupSelectorData {
  group: number;
}

const actions = [
  { icon: <FileCopyIcon />, name: 'Level 1' },
  { icon: <SaveIcon />, name: 'Level 2' },
  { icon: <PrintIcon />, name: 'Level 3' },
  { icon: <ShareIcon />, name: 'Level 4' },
  { icon: <ShareIcon />, name: 'Level 5' },
  { icon: <ShareIcon />, name: 'Level 6' },
  { icon: <ShareIcon />, name: 'Difficult Words' },
];

function GroupSelector(props: GroupSelectorData) {
  const { group } = props;
  console.log(group);

  return (
    <Box className="group-selector">
      <SpeedDial
        className="group-selector__dial"
        ariaLabel="Gategory Selector"
        icon={<SpeedDialIcon />}
        direction="up"
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

export default GroupSelector;
