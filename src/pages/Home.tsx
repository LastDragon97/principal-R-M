import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import Item from '../components/Item';
import Gallery from 'remoteGallery/gallery';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function Home() {
  return (
    <BrowserRouter>
      <Box sx={{ width: '100%' }}>
        <Menu />
        <Stack spacing={2}>
          <Item>
            <Routes>
              <Route path="/" element={<h1>Hola!</h1>} />
              <Route path="/gallery/*" element={<Gallery />} />
            </Routes>
          </Item>
          <Item>
            <Footer />
          </Item>
        </Stack>
      </Box>
    </BrowserRouter>
  );
}
