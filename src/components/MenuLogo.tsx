import { type MouseEvent } from 'react';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

const TITLE = 'Vista Multiversal';

interface Props {
  anchorElNav: HTMLElement | null;
  handleOpenNavMenu: (
    event: MouseEvent<HTMLElement, globalThis.MouseEvent>,
  ) => void;
  handleCloseNavMenu: () => void;
}

const MenuLogo: React.FC<Props> = ({
  anchorElNav,
  handleOpenNavMenu,
  handleCloseNavMenu,
}) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Link to="/">
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          className="typography-class"
          sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
        >
          {TITLE}
        </Typography>
      </Link>
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
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <Link to="/gallery">
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography sx={{ textAlign: 'center' }}>Personajes</Typography>
            </MenuItem>
          </Link>
        </Menu>
      </Box>
      <Link to="/">
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          className="typography-700-class"
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
          }}
        >
          {TITLE}
        </Typography>
      </Link>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <Link to="/gallery">
          <Button
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            Personajes
          </Button>
        </Link>
      </Box>
    </Stack>
  );
};

export default MenuLogo;
