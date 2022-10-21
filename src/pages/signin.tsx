import * as React from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { useFormAction } from "react-router-dom";
import Layout from "../layout/Layout";
import { useQuery } from "@tanstack/react-query";
import httpClient from "../libs/http-client";
import { Box } from "@mui/system";

export default function SignInPage() {
  // 데이터 불러오기
  function useSignIn() {
    return useQuery(["useSignIn"], async () => {
      const { data } = await httpClient.post<user>("/auth/login");
      return data;
    });
  }

  // user interface
  interface user {
    email: string;
    password: string;
  }

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <form>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h6">
              Sign In
            </Typography>

            <Box
              component="form"
              noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <TextField
                name="email"
                label="email"
                variant="outlined"
                autoComplete="email"
                margin="normal"
                fullWidth
              />

              <TextField
                name="password"
                label="password"
                variant="outlined"
                type="password"
                autoComplete="current-password"
                margin="normal"
                fullWidth
              />

              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                SignIn !
              </Button>
            </Box>
          </Box>
        </form>
      </Container>
    </Layout>
  );
}
