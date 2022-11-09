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

type FormValue = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (
    data: FormValue
    // , err: FieldErrors<FormValue>
  ) => {
    // err.email?.message;
    console.log("data :", data);
  };

  // console.log("data :", onSubmit.data);

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
            onSubmit={
              handleSubmit(onSubmit)
              // (e, event) => {},
              // (err) => {}
            }
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
              control={control}
              rules={{
                required: { value: true, message: "필수입니다." },
                validate(value) {
                  const message = "이메일 형식이 아닙니다.";
                  const emailRegx =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                  /**
                   * input 값이 이메일 형식이 맞다면, true 로 설정
                   */
                  // const isTest = emailRegx.test(value);

                  /**
                   * [isTest] 값이 true 이면 아무것도 return 하면 안된다.
                   * 만약, 무엇인가 return 된다면, error 로 반환된다.
                   */
                  // if (isTest) {
                  //   return;
                  // }

                  return emailRegx.test(value) || message;
                },
              }}
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
                validate(value) {
                  const message =
                    "8자리 이상, 영문, 숫자, 특수문자 조합이어야 합니다.";
                  const pwRegx =
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

                  return pwRegx.test(value) || message;
                },
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
                validate(value) {
                  if (watch("password") != value) {
                    return "비밀번호가 다릅니다.";
                  }
                },
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
