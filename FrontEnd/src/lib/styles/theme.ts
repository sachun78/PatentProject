import { createTheme } from '@mui/material/styles';
import { red,cyan } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: cyan['500'],
      contrastText: "#fff"
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
