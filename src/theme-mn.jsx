/**minion protocol color theme */
import { createTheme } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';

const theme = createTheme({
  components: { 
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--primary-color': '#EDF069',
          '--secondary-color': '#131314',
          '--background-color': '#131314',
          '--text-color': '#333',
          '--contrast-text-color': '#FFFFFF',
          '--button-background': '#EDF069',
          '--button-hover-background': '#F5F779',
          '--delete-background': '#F5F779',
          '--delete-hover-background': '#EDF069',
          '--font-family': 'Lexend Deca,Inter',
        },
          body: {
          backgroundColor: 'var(--background-color)',
          color: 'var(--contrast-text-color)',
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
        },
        '.loading-circle': {
          backgroundColor: 'var(--primary-color)',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#EDF069',  // Use primary color from root
    },
    secondary: {
      main: '#131314',  // Use secondary color from root
    },
    background: {
      default: '#131314',  // Use background color from root
    },
    text: {
      primary: '#333',  // Use text color from root
      secondary: '#FFFFFF',  // Fixed secondary text color
    },
    action: {
      hover: '#F5F779',  // Use hover color from root
    },
  },
  typography: {
    fontFamily: 'Lexend Deca,Inter',  // Use font family from root
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#EDF069',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#EDF069',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
      color: '#EDF069',
    },
    body1: {
      fontSize: '1rem',
      color: '#333',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#333',
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