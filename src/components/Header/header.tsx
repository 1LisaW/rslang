import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StylesProvider } from '@material-ui/core/styles';

import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import Authorization from '../Authorization/authorization';
import { getIsGameAvailable } from '../store/wordListSlice';
import { isAuth } from '../store/authSlice';
import './header.scss';

const pages = [
  {
    title: 'ГЛАВНАЯ',
    key: 'main',
    link: '/',
    state: true,
  },
  {
    title: 'УЧЕБНИК',
    key: 'tutorial',
    link: 'tutorial',
    state: true,
  },
  {
    title: 'АУДИОВЫЗОВ',
    key: 'audiocall',
    link: 'audiocall',
    state: true,
    game: true,
  },
  {
    title: 'СПРИНТ',
    key: 'sprint',
    link: 'sprint',
    state: true,
    game: true,
  },
  {
    title: 'СТАТИСТИКА',
    key: 'statistic',
    link: 'statistic',
    state: true,
    statistic: true,
  },
];

function ResponsiveAppBar() {
  const isGameAvailable = useSelector(getIsGameAvailable);
  const isAuthorized = useSelector(isAuth);
  const checkAuthPages = isAuthorized
    ? pages
    : pages.filter(page => !page.statistic);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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

  const location = useLocation();

  const isCurrantPageTutorial = location.pathname.startsWith('/tutorial');

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              color="secondary"
              className="logo__title"
              variant="h2"
              noWrap
              component="a"
              href="/rslang"
              sx={{
                fontFamily: 'Teko',
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: '.3rem',
                textDecoration: 'none',
              }}
            >
              IngLang
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {checkAuthPages.map(page => (
                  <MenuItem
                    key={`menuItem ${page.key}`}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography
                      key={`menuItem typo ${page.key}`}
                      textAlign="center"
                      className="navbar__item"
                    >
                      {(!isCurrantPageTutorial ||
                        !page.game ||
                        (isGameAvailable && page.game)) && (
                        <Link
                          key={`menuItem link ${page.key}`}
                          to={page.link}
                          state={{ prevPath: location.pathname }}
                        >
                          {page.title}
                        </Link>
                      )}
                      {isCurrantPageTutorial && page.game && !isGameAvailable && (
                        <Link
                          key={`menuItem link ${page.key}`}
                          to={page.link}
                          state={{ prevPath: location.pathname }}
                          className="disabled-link"
                        >
                          {page.title}
                        </Link>
                      )}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              color="secondary"
              className="logo__title"
              variant="h2"
              noWrap
              component="a"
              href="/rslang"
              sx={{
                mr: 2,
                fontFamily: 'Teko',
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: '.3rem',
                textDecoration: 'none',
              }}
            >
              IngLang
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {checkAuthPages.map(page => (
                <StylesProvider key={`StylesProvider${page.key}`} injectFirst>
                  <Button
                    key={`button ${page.key}`}
                    className="navbar__item"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {(!isCurrantPageTutorial ||
                      !page.game ||
                      (isGameAvailable && page.game)) && (
                      <Link
                        key={`button link ${page.key}`}
                        to={page.link}
                        state={{ prevPath: location.pathname }}
                      >
                        {page.title}
                      </Link>
                    )}
                    {isCurrantPageTutorial && page.game && !isGameAvailable && (
                      <Link
                        key={`button link ${page.key}`}
                        to={page.link}
                        state={{ prevPath: location.pathname }}
                        className="disabled-link"
                      >
                        {page.title}
                      </Link>
                    )}
                  </Button>
                </StylesProvider>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Authorization />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default ResponsiveAppBar;
