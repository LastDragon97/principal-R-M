import './Components.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function Footer() {
  return (
      <Container sx={{ textAlign: 'center' }}>
        <Box
          className="typography-class"
          sx={{ height: '5vh' }}
        >
          <h2>Por Mauricio Emmanuel</h2>
        </Box>
      </Container>
  );
}
