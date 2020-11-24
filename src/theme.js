import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
// import indigo from "material-ui/colors/indigo";
// import pink from "material-ui/colors/pink";
// import red from "material-ui/colors/red";

export default createMuiTheme({
  palette: {
    primary: {
      main: "#2a4067",
    },
    secondary: {
      main: "#227bef",
    },
    // secondary: "123", // Indigo is probably a good match with pink
  },
});
