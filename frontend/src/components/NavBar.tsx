import {AppBar, Box, Button, Toolbar} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import {Link} from 'react-router-dom';

export default function NavBar() {
  return (
    <Box className={'navbar'}>
      <AppBar sx={{background: '#552583'}}>
        <Toolbar>
          <Link to={'/'}><HomeIcon className={'navbar-buttons'}/></Link>
          <Button>
            <Link className={'navbar-buttons'} to={'/purchases'}>Purchases</Link>
          </Button>
          <Button>
            <Link className={'navbar-buttons'} to={'/consoles'}>Consoles</Link>
          </Button>
          <Button>
            <Link className={'navbar-buttons'} to={'/games'}>Games</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}