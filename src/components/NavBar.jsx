import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  useMediaQuery, 
  useTheme,
  Drawer,
  Box
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import { Home, Favorite, Logout, Movie } from '@mui/icons-material';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { name: 'Home', icon: <Home />, path: '/home-page' },
    { name: 'Favorites', icon: <Favorite />, path: '/favorites' },
  ];

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && (
          <IconButton color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        )}

        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Movie onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
          <Typography variant="h6" component="div">
            Movie Explorer
          </Typography>
        </Box>

        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                color="inherit"
                component={Link}
                to={item.path}
                startIcon={item.icon}
              >
                {item.name}
              </Button>
            ))}
            <Button
              color="inherit"
              onClick={logout}
              startIcon={<Logout />}
            >
              Logout
            </Button>
          </Box>
        )}

        <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 250, p: 2 }}>
            {navItems.map((item) => (
              <Button
                fullWidth
                key={item.name}
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{ justifyContent: 'flex-start', p: 2 }}
              >
                {item.name}
              </Button>
            ))}
            
            <Button
              fullWidth
              onClick={logout}
              startIcon={<Logout />}
              sx={{ justifyContent: 'flex-start', p: 2 }}
            >
              Logout
            </Button>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;