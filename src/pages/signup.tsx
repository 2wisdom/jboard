import * as React from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { useFormAction } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Layout from "../layout/Layout";
import httpClient from "../libs/http-client";
import { Box } from "@mui/system";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";

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

type FormValue = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: FormValue, err: FieldErrors<FormValue>) => {
    // err.email?.message;
  };

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
            onSubmit={handleSubmit(
              (e, event) => {},
              (err) => {}
            )}
            sx={{ mt: 3 }}
          >
            <Controller
              name="name"
              control={control}
              rules={{
                required: { value: true, message: "필수입니다." },
                minLength: { value: 2, message: "2글자 이상이어야 합니다." },
                maxLength: { value: 12, message: "13글자 미만이어야 합니다." },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="name"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="email"
              ref={register({
                required: "필수입니다",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message:
                    "8자리 이상, 영문, 숫자, 특수문자가 포함되어야 합니다.",
                },
              })}
              control={control}
              // rules={{
              //   required: { value: true, message: "필수입니다." },
              //   pattern:
              //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              // }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="email"
                  variant="outlined"
                  autoComplete="email"
                  margin="normal"
                  fullWidth
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: { value: true, message: "필수입니다." },
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="password"
                  variant="outlined"
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  fullWidth
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: { value: true, message: "필수입니다." },
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="confirm password"
                  variant="outlined"
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  fullWidth
                  {...field}
                  error={!!error}
                  helperText={error?.message}
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
