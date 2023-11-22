import { Box, Button, Collapse, List } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { IconWrapper } from "./IconWrapper";
import { NavBarBoxItem } from "./NavBarBoxItem";
import { NavListItemButton } from "./NavListItemButton";
import { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ArticleIcon from "@mui/icons-material/Article";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const SideNavBar = () => {
  const listSubject = [
    "Network safety and Security",
    "Computer Graphics",
    "Network Programming",
    "Web Application Development",
  ];

  const listChapter = ["Chapter 1", "Chapter 2", "Chapter 3"];
  const [chosenSubject, setChosenSubject] = useState(10000);

  const handleClickSubject = (index: number) => {
    if (chosenSubject == index) {
      setChosenSubject(10000);
    } else {
      setChosenSubject(index);
    }
  };

  return (
    <div className="side-bar">
      <NavBarBoxItem key={"recent"}>
        <p style={{ fontWeight: "900", padding: "0px 10px", flexGrow: 1 }}>
          {" "}
          Recent{" "}
        </p>
      </NavBarBoxItem>

      <List disablePadding>
        {listSubject.map((subjectName, subjectIndex) => {
          return (
            <>
              <NavListItemButton
                key={subjectIndex}
                onClick={() => handleClickSubject(subjectIndex)}
              >
                <NavBarBoxItem key={subjectIndex}>
                  <IconWrapper>
                    {subjectIndex == chosenSubject ? (
                      <ExpandLess />
                    ) : (
                      <LocalLibraryIcon />
                    )}
                  </IconWrapper>
                  <span
                    style={{
                      marginLeft: "10px",
                      whiteSpace: "nowrap",
                      flex: 1,
                    }}
                  >
                    {" "}
                    {subjectName}{" "}
                  </span>
                  <IconWrapper
                    style={{
                      backgroundColor: "transparent",
                    }}
                  >
                    <MoreHorizIcon />
                  </IconWrapper>
                </NavBarBoxItem>
              </NavListItemButton>

              <Collapse
                in={subjectIndex == chosenSubject}
                timeout="auto"
                unmountOnExit
              >
                {listChapter.map((chapterName, chapterIndex) => {
                  return (
                    <NavListItemButton
                      style={{
                        marginLeft: "20px",
                      }}
                      key={chapterName}
                    >
                      <NavBarBoxItem>
                        <IconWrapper>
                          <ArticleIcon />
                        </IconWrapper>
                        <span style={{ marginLeft: "10px" }}>
                          {" "}
                          {chapterName}{" "}
                        </span>
                      </NavBarBoxItem>
                    </NavListItemButton>
                  );
                })}
              </Collapse>
            </>
          );
        })}
      </List>

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
