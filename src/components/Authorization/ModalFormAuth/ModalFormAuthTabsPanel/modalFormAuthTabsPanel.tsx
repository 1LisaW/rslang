/* eslint-disable react/require-default-props */
import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import SignIn from '../../SignIn/signin';
import SignUpPage from '../../SignUp/signUp';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function ModalFormAuthTabsPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AuthFormTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', minHeight: '70vh' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="SIGN IN"
            component={Link}
            to="#signIn"
            {...a11yProps(0)}
          />
          <Tab
            label="SiGN UP"
            component={Link}
            to="#signUp"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <ModalFormAuthTabsPanel value={value} index={0}>
        <SignIn />
      </ModalFormAuthTabsPanel>
      <ModalFormAuthTabsPanel value={value} index={1}>
        <SignUpPage />
      </ModalFormAuthTabsPanel>
    </Box>
  );
}
