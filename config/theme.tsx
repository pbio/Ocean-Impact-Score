import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
// Create a theme instance.
const theme = createTheme({
palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: ['product-sans', 'sans-serif'].join(','),
  },
});
export default theme;