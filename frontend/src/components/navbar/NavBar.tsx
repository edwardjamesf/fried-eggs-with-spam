import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Favorite, Home, Insights } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const mainMenuOpts = ['Home', 'Wishlist', 'Metrics'];
  const mainMenuIcons = [<Home />, <Favorite />, <Insights />];
  const mainMenuRoutes = ['/', '/aaa', '/']; // TODO: fix this. this is not working

  const [openMainMenu, setOpenMainMenu] = useState(false);

  const MainMenu = (
    <Box
      sx={{ width: 250 }}
      role='presentation'
      onClick={() => setOpenMainMenu(false)}
    >
      <List>
        {mainMenuOpts.map((text, index) => (
          <ListItem
            key={text}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>{mainMenuIcons[index]}</ListItemIcon>
              <ListItemText primary={text} />
              <NavLink to={mainMenuRoutes[index]}></NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box position={'sticky'}>
      <AppBar>
        <Toolbar>
          <IconButton onClick={() => setOpenMainMenu(true)}>
            <MenuIcon />
          </IconButton>
          <Typography>Fried Eggs with Spam</Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={openMainMenu} onClose={() => setOpenMainMenu(false)}>
        {MainMenu}
      </Drawer>
    </Box>
  );
}
