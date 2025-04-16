import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#81c784',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#c8e6c9',
    },
    background: {
      default: '#ffffff',
      paper: '#f9f9f9',
    },
    text: {
      primary: '#2e2e2e',
      secondary: '#4f4f4f',
    },
  },
});

export default lightTheme;
