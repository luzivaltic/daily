import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

interface Props extends BoxProps {
  children: ReactNode;
}

export const NavBarBoxItem = ({ children, ...boxProps }: Props) => {
  return (
    <Box
      {...boxProps}
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "5px",
        borderRadius: "10px",
        cursor: "pointer",
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
};