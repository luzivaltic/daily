'use client'
import { Button, Grid, Link, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UserInfo from "./types";
import { useRouter } from "next/navigation";

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

    // redirect to main page
    router.push('/');

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
          Sign in
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={ handleSubmit }
          sx={{ mt: 5, mb: 5 }}
        >
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              Don't have an account ?
              <Link href="/pages/auth/signup">
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
