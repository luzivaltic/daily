import { Paper, PaperProps } from "@mui/material";
import { ReactNode } from "react";

interface Props extends PaperProps {
  children: ReactNode;
  bgcolor?: string;
}

export const IconWrapper = ({ children, ...paperProps }: Props) => {
  const { bgcolor } = paperProps;

  return (
    <Paper
      elevation={0}
      {...paperProps}
      sx={{
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "5px",
        borderRadius: "10px",
        cursor: "pointer",
        backgroundColor: bgcolor ? bgcolor : "#E8E8E8",
        ":hover": {
          backgroundColor: "gray",
        },
      }}
    >
      {children}
    </Paper>
  );
};
