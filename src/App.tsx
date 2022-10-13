import { CssBaseline, ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import IndexPage from "./pages";
import MyPageIndexPage from "./pages/mypage";
import PostDetail from "./pages/posts/_id";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import theme from "./theme";
import queryClient from "./libs/query-client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/posts/:id",
    element: <PostDetail />,
  },
  {
    path: "/mypage",
    element: <MyPageIndexPage />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
