import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';

const Layout = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Apartment Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout; 