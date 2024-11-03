
import { createTheme } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';

const theme = createTheme({
  components: { 
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--primary-color': '#FFBAC6',
          '--secondary-color': '#F29DAC',
          '--background-color': '#FFFFFF',
          '--text-color': '#525252',
          '--contrast-text-color': '#FFFFFF',
          '--button-background': '#525252',
          '--button-hover-background': '#FFBAC6',
          '--delete-background': '#FFFFFF',
          '--delete-hover-background': '#FFBAC6',
          '--font-family': 'Inter,Lucida Console',
        },
          body: {
          backgroundColor: 'var(--background-color)',
          color: 'var(--text-color)',
          fontFamily: 'var(--font-family)',
          margin: 0,
          padding: 0,
        },
        '.App-header': {
          backgroundColor: 'var(--primary-color)',
          color: '#ffffff',
        },
        '.MuiButton-root': {
          backgroundColor: 'var(--button-background)',
          color: '#ffffff',
        },
        '.MuiButton-root:hover': {
          backgroundColor: 'var(--button-hover-background)',
        },
        '.delete': {
          backgroundColor: 'var(--delete-background)',
          color: '#ffffff',
        },
        '.delete:hover': {
          backgroundColor: 'var(--delete-hover-background)',
        },
        '.toggle-button': {
          backgroundColor: 'var(--secondary-color)',
          color: '#ffffff',
        },
        '.toggle-button:hover': {
          backgroundColor: 'var(--button-hover-background)',
        }
      },
    },
  },
  palette: {
    primary: {
      main: '#FFBAC6',  // Use primary color from root
    },
    secondary: {
      main: '#F29DAC',  // Use secondary color from root
    },
    background: {
      default: '#FFFFFF',  // Use background color from root
    },
    text: {
      primary: '#525252',  // Use text color from root
      secondary: '#FFFFFF',  // Fixed secondary text color
    },
    action: {
      hover: '#FFBAC6',  // Use hover color from root
    },
  },
  typography: {
    fontFamily: 'Inter,Lucida Console',  // Use font family from root
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#FFBAC6',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#FFBAC6',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
      color: '#FFBAC6',
    },
    body1: {
      fontSize: '1rem',
      color: '#525252',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#525252',
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
      color: '#FFFFFF',
    },
  },
});

const GlobalCss = () => (
  <GlobalStyles
    styles={`@import url('https://fonts.googleapis.com/css2?display=swap&family=Inter:ital,wght@0,400;0,600;1,400;1,600');`}
  />
);

export  {theme, GlobalCss};