import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function ButtonAppBar() {
  const handleLogout = () => {
    window.sessionStorage.clear();
    window.location.href = "/";
  }

  return (
    <Box sx={{ flexGrow: 1, height: "64px", backgroundColor: "black" }}>
      <AppBar
        position="static"
        style={{
          backgroundColor: "#D9D9D9",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.27778 8.55556C2.27778 5.37852 4.87412 2.77778 8.10811 2.77778H11.6579C10.5387 4.42544 9.88439 6.41274 9.88439 8.55555V9.36111C9.88439 15.082 14.5483 19.6944 20.2703 19.6944H21.5444C23.8555 19.6944 25.9939 18.942 27.7222 17.668V21.4444C27.7222 24.6215 25.1259 27.2222 21.8919 27.2222H8.10811C4.87412 27.2222 2.27778 24.6215 2.27778 21.4444V8.55556ZM14.4399 8.55555C14.4399 5.37852 17.0363 2.77778 20.2703 2.77778H21.5444C24.7784 2.77778 27.3747 5.37852 27.3747 8.55556V9.36111C27.3747 12.5381 24.7784 15.1389 21.5444 15.1389H20.2703C17.0363 15.1389 14.4399 12.5381 14.4399 9.36111V8.55555Z" stroke="white" stroke-width="4.55556"/>
            </svg>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
            DAILY
          </Typography>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleLogout}
          >
            Log out
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
