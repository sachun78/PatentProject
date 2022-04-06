import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#A1045A',
      contrastText: '#f7f7f8'
    },
    secondary: {
      main: '#A1045A'
    },
    error: {
      main: red.A400
    }
  }
})

export default theme
