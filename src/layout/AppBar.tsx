import { Button, Toolbar, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { Link } from "react-router-dom";

export default function AppBar() {
  return (
    <MuiAppBar>
      <Toolbar>
        <Typography component={Link} to="/">
          JBoard
        </Typography>
        <span style={{ flexGrow: 1 }} />
        <Button>LOGIN</Button>
      </Toolbar>
    </MuiAppBar>
  );
}
