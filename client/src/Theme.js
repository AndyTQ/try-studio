import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    text: {
      primary: "#000000",
      secondary: "#4D4F5C"
    },
    primary: {
        main: '#1976D2',
    },
    secondary: {
        main: '#2196F3',
    },
    background: {
      default: "#f7f9fc"
    }
  },
  typography: {
    fontFamily: "Nunito",
    h6: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 300,
      fontStyle: 'italic'
    }
  },
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: "0 0 14px 0 rgba(53,64,82,.05)"
      }
    },
    MuiStepIcon: {
      root: {
        '&$completed': {
          color: '#1976D2',
        },
        '&$active': {
          color: '#1976D2',
        },
      },
    },
  }
});

export default theme;