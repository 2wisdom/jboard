import * as React from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { useFormAction } from "react-router-dom";
import Layout from "../layout/Layout";
import { useQuery } from "@tanstack/react-query";
import httpClient from "../libs/http-client";
import { Box } from "@mui/system";

// user interface
interface User {
  email: string;
  password: string;
  nickname: string;
}

export default function SignUpPage() {
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
              Sign Up
            </Typography>

            <Box
              component="form"
              noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <TextField
                name="name"
                label="name"
                variant="outlined"
                margin="normal"
                fullWidth
                autoFocus
              />

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

              <TextField
                name="confirmPassword"
                label="confirm password"
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
                SignUp !
              </Button>
            </Box>
          </Box>
        </form>
      </Container>
    </Layout>
  );
}
