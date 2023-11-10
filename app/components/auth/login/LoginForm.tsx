'use client'
import { Button, Grid, InputAdornment, Link, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UserInfo from "../types";
import { useRouter } from "next/navigation";
import EmailTextField from "../EmailTextField";
import PasswordTextField from "../PasswordTextField";
import SubmitButton from "../SubmitButton";
import assert from "assert";

const LoginForm = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userInfo: UserInfo = {
      email: data.get('email'),
      password: data.get('password')
    }
    const url = process.env.BASE_URL + '/pages/api/login';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(userInfo),
    });
  
    const responseData = await response.json();

    assert(response.status === 200);

    // redirect to main page
    router.push('/');
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
          <b>Sign in</b>
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={ handleSubmit }
          sx={{ mt: 5, mb: 5 }}
        >
          <EmailTextField />
          <PasswordTextField name="password" label="Password" />
          <SubmitButton content="login" />
          
          <Grid container>
            <Grid item>
              Don't have an account ?
              <Link href="/pages/auth/signup" style={{ textDecoration: 'none' }}>
                {" Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default LoginForm;
