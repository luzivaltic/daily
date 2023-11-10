import { InputAdornment, TextField } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';

type PasswordType = {
  name: string;
  label: string;
};

const PasswordTextField = ({ name, label }: PasswordType) => {
  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon />
          </InputAdornment>
        ),
      }}
      margin="normal"
      required
      fullWidth
      name={name}
      label={label}
      type="password"
      id="password"
      placeholder={label}
    />
  );
};

export default PasswordTextField;
