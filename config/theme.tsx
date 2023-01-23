import { createTheme, responsiveFontSizes } from '@mui/material/styles';
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
//responsiveFontSizes will make the font sizes adapt to the size of the screen automatically
export default responsiveFontSizes(theme);