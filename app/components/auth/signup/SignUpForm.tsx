"use client";
import { Button, Grid, InputAdornment, Link, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UserInfo from "../types";
import { useRouter } from "next/navigation";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import SubmitButton from "../SubmitButton";
import UsernameTextField from "../UsernameTextField";
import EmailTextField from "../EmailTextField";
import PasswordTextField from "../PasswordTextField";
import assert from "assert";
import { BASE_URL } from "@/app/env";

const SignUpForm = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const userInfo: UserInfo = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      passwordConfirm: data.get("passwordConfirm"),
    };
    const url = BASE_URL + "/users/signup";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    assert(response.status === 201);

    router.push("/pages/auth/login"); // redirect to login
  };

  return (
    <>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          <b>Sign Up</b>
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3, mb: 2 }}
        >
          <UsernameTextField />
          <EmailTextField />
          <PasswordTextField name="password" label="Password" />
          <PasswordTextField name="passwordConfirm" label="Password Confirm" />
          <SubmitButton content="sign up" />

          <Grid container>
            <Grid item>
              Already have an account
              <Link href="/pages/auth/login" style={{ textDecoration: "none" }}>
                {" Login"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default SignUpForm;
