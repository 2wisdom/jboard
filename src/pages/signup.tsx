import * as React from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { useFormAction } from "react-router-dom";
import Layout from "../layout/Layout";
import { useQuery } from "@tanstack/react-query";
import httpClient from "../libs/http-client";
import { Box } from "@mui/system";

export default function SignUpPage() {
  // 데이터 불러오기
  function useSignUp() {
    return useQuery(["useSignUp"], async () => {
      const { data } = await httpClient.post<user>("/user");
      return data;
    });
  }

  // user interface
  interface user {
    email: string;
    password: string;
    nickname: string;
  }

  return (
    <Layout>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Container
          sx={{
            p: 3,
            m: 10,
          }}
        >
          <Box component="div">
            <Typography>SignUp</Typography>
          </Box>
          <Box component="form">
            <TextField
              required
              type="name"
              id="name"
              label="name"
              variant="standard"
              // sx={{ m: 3 }}
              margin="normal"
              fullWidth
            />
            <TextField
              required
              type="email"
              id="email"
              label="email"
              variant="standard"
              margin="normal"
              fullWidth
            />
            <TextField
              required
              type="password"
              id="password"
              label="password"
              variant="standard"
              margin="normal"
              fullWidth
            />
            <TextField
              required
              type="password"
              id="ConfirmPassword"
              label="ConfirmPassword"
              variant="standard"
              margin="normal"
              fullWidth
            />
          </Box>
          <Button variant="outlined" sx={{ m: 5 }}>
            SignUp
          </Button>
        </Container>
      </Grid>
    </Layout>
  );
}
