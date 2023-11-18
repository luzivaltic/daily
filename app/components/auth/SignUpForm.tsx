'use client'
import { Button, Grid, Link, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UserInfo from "./types";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const userInfo: UserInfo = {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
      passwordConfirm: data.get('passwordConfirm'),
    }
    const url = process.env.BASE_URL + '/pages/api/signup';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(userInfo),
    });

    router.push('/pages/auth/login'); // redirect to login

    const responseData = await response.json();
    return responseData;
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
          Sign Up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={ handleSubmit }
          sx={{ mt: 3, mb: 2 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="passwordConfirm"
            label="Password confirm"
            type="password"
            id="password-confirm"
            autoComplete="passwordConfirm"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              Already have an account
              <Link href="/pages/auth/login">
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
