import { ListItemButton, ListItemButtonProps } from "@mui/material";
import { useState } from "react";



export const NavListItemButton = ({ children, ...props } : ListItemButtonProps) => {
    return (
        <ListItemButton {...props} sx={{
            padding: "0px",
            borderRadius: "10px",
        }}
        >
            {children}
        </ListItemButton>
    );
}