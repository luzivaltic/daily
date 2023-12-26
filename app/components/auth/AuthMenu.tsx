'use client'
import Grid from "@mui/material/Grid";
import AuthMenuBackGround from '../../../public/AuthMenu.png';

export const AuthMenu = () => {
  return (
    <Grid
      item
      xs={false}
      sm={4}
      md={7}
      sx={{
        backgroundImage: `url(${AuthMenuBackGround.src})`,
        backgroundColor: (t) =>
          t.palette.mode === "light"
            ? t.palette.grey[50]
            : t.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
};

