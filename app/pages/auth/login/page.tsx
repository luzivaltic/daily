'use client'
import { NextPage } from "next";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import LoginForm from "@/app/components/auth/login/LoginForm";
import AuthMenu from "@/app/components/auth/AuthMenu";

const LoginPage: NextPage = () => {
  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Grid container>
          <CssBaseline />
          <AuthMenu />
          <Grid
            item xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <LoginForm />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LoginPage;
