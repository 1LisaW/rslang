import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Tooltip from '@mui/material/Tooltip';
import Backdrop from '@mui/material/Backdrop';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import Filter1OutlinedIcon from '@mui/icons-material/Filter1Outlined';
import Filter2OutlinedIcon from '@mui/icons-material/Filter2Outlined';
import Filter3OutlinedIcon from '@mui/icons-material/Filter3Outlined';
import Filter4OutlinedIcon from '@mui/icons-material/Filter4Outlined';
import Filter5OutlinedIcon from '@mui/icons-material/Filter5Outlined';
import Filter6OutlinedIcon from '@mui/icons-material/Filter6Outlined';

import { isAuth } from '../../store/authSlice';
import './groupSelector.scss';

const TOOLTIP_TITLE = 'Выбор сложности слов';
const USER_WORDS = 'Сложные слова';

const actions = [
  { icon: <Filter1OutlinedIcon />, name: 'Уровень 1' },
  { icon: <Filter2OutlinedIcon />, name: 'Уровень 2' },
  { icon: <Filter3OutlinedIcon />, name: 'Уровень 3' },
  { icon: <Filter4OutlinedIcon />, name: 'Уровень 4' },
  { icon: <Filter5OutlinedIcon />, name: 'Уровень 5' },
  { icon: <Filter6OutlinedIcon />, name: 'Уровень 6' },
  { icon: <StarBorderPurple500OutlinedIcon />, name: USER_WORDS },
];

interface GroupSelectorProps {
  changeHandler: (newGroup: number) => void;
}

function GroupSelector(props: GroupSelectorProps) {
  const { changeHandler } = props;
  const isAuthorized = useSelector(isAuth);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className="group-selector">
      <Backdrop open={open} />
      <Tooltip title={TOOLTIP_TITLE}>
        <SpeedDial
          className="group-selector__dial"
          sx={{ top: isAuthorized ? -380 : -324 }}
          ariaLabel="Gategory Selector"
          icon={<SpeedDialIcon icon={<MenuBookTwoToneIcon />} />}
          direction="up"
          onClose={handleClose}
          onOpen={handleOpen}
        >
          {actions.map((action, index) => (
            action.name !== USER_WORDS || isAuthorized ? (
              <SpeedDialAction
                className="speeddial-action"
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipPlacement="right"
                onClick={() => changeHandler(index)}
              />
            ) : null
          ))}
        </SpeedDial>
      </Tooltip>
    </Box>
  );
}

export default GroupSelector;
