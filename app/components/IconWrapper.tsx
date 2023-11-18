import { Paper, PaperProps } from "@mui/material";
import { ReactNode } from "react";

interface Props extends PaperProps {
  children: ReactNode;
}

export const IconWrapper = ({ children, ...paperProps }: Props) => {
  const something: ReactNode = [];
  return (
    <Paper
      elevation={0}
      {...paperProps}
      sx={{
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "5px",
        borderRadius: "12px",
        backgroundColor: "#E8E8E8",
      }}
    >
      {children}
    </Paper>
  );
};
