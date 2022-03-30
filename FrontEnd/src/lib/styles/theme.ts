import { createTheme } from '@mui/material/styles';
import { red,purple } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: purple['400'],
      contrastText: "#f7f7f8",
    },
    secondary: {
      main: purple['600'],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
