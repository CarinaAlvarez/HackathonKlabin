import { createMuiTheme } from '@material-ui/core/styles';

const CustomTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#50c75e',
      main: '#009530',
      dark: '#006600',
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#98ee99',
      main: '#66bb6a',
      dark: '#338a3e',
      //contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    // contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    // tonalOffset: 0.2,
  },
});

export default CustomTheme;