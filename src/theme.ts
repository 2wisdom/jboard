import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableFocusRipple: true,
        disableRipple: true,
        disableTouchRipple: true,
        variant: "contained",
      },
    },
  },
});

export default theme;
