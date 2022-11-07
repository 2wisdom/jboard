import * as React from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useFormAction } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Layout from "../layout/Layout";
import httpClient from "../libs/http-client";
import { Box } from "@mui/system";

// user interface
interface User {
  email: string;
  password: string;
  nickname: string;
}

// user 정보 가져오기
function useUser() {
  return (
    useQuery(["useUser"]),
    async () => {
      const { data } = await httpClient.post("/user");
      return data;
    }
  );
}

export default function SignUpPage() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => console.log("data :", data);

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
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
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Controller
              name="name"
              control={control}
              rules={{
                required: true,
                minLength: 2,
                maxLength: 12,
              }}
              render={({ field }) => (
                <TextField
                  label="name"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  {...field}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              }}
              render={({ field }) => (
                <TextField
                  label="email"
                  variant="outlined"
                  autoComplete="email"
                  margin="normal"
                  fullWidth
                  {...field}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: true,
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              }}
              render={({ field }) => (
                <TextField
                  label="password"
                  variant="outlined"
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  fullWidth
                  {...field}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: true,
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              }}
              render={({ field }) => (
                <TextField
                  label="confirm password"
                  variant="outlined"
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  fullWidth
                  {...field}
                />
              )}
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
      </Container>
    </Layout>
  );
}
