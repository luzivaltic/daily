import { Button } from "@mui/material";

type ButtonContent = {
  content: String;
}

const SubmitButton = ({ content }: ButtonContent) => (
  <Button
    type="submit"
    fullWidth
    variant="contained"
    sx={{ mt: 3, mb: 2 }}
  >{ content }</Button>
);

export default SubmitButton;
