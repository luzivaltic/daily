import { InputAdornment, TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const UsernameTextField = () => {
  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <PersonIcon />
          </InputAdornment>
        ),
      }}
      margin="normal"
      required
      fullWidth
      id="username"
      label="Username"
      name="username"
      autoComplete="username"
      autoFocus
      placeholder="Username"
    />
  );
};

export default UsernameTextField;
