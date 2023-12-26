import { InputAdornment, TextField } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';

const EmailTextField = () => {
  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <EmailIcon />
          </InputAdornment>
        ),
      }}
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      placeholder="Email"
      autoFocus
    />
  );
};

export default EmailTextField;
