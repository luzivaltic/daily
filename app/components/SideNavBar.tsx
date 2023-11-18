import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import SearchIcon from "@mui/icons-material/Search";
import { IconWrapper } from "./IconWrapper";
import { NavBarBoxItem } from "./NavBarBoxItem";

export const SideNavBar = () => {
  const listSubject = [
    "Network safety and Security",
    "Computer Graphics",
    "Network Programming",
    "Web Application Development",
  ];

  return (
    <div className="side-bar">
      <NavBarBoxItem key={"recent"}>
        <p style={{ fontWeight: "900", padding: "0px 10px", flexGrow: 1 }}>
          {" "}
          Recent{" "}
        </p>
        <IconWrapper>
          <SearchIcon />
        </IconWrapper>
      </NavBarBoxItem>

      {listSubject.map((subjectName, index) => {
        return (
          <NavBarBoxItem key={index}>
            <IconWrapper>
              <LocalLibraryIcon />
            </IconWrapper>
            <span style={{ marginLeft: "10px" }}> {subjectName} </span>
          </NavBarBoxItem>
        );
      })}

      <div
        style={{
          marginTop: "auto",
        }}
      >
        <Button
          sx={{
            backgroundColor: "#E8E8E8",
            color: "black",
            borderRadius: "100px",
            padding: "10px 20px",
          }}
        >
          <AddIcon sx={{ marginRight: "10px" }} /> New subject
        </Button>
      </div>
    </div>
  );
};
