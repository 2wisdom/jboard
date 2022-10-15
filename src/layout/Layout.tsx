import { Box, Toolbar } from "@mui/material";
import AppBar from "./AppBar";

export type LayoutProps = {
  children: any;
  title?: string;
};

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <div>
      <AppBar />
      <Toolbar />
      <Box component="main">{children}</Box>
    </div>
  );
}
