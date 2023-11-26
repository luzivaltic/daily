import { Box, Button, Collapse, List } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { IconWrapper } from "./IconWrapper";
import { NavBarBoxItem } from "./NavBarBoxItem";
import { NavListItemButton } from "./NavListItemButton";
import React, { useEffect, useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ChapterList } from "./ChapterList";
import axios, { HeadersDefaults } from "axios";
import { BASE_URL } from "../env";
import { useCookies } from "next-client-cookies";

type Subject = {
  title: String;
};

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export const SideNavBar = () => {
  const cookies = useCookies();
  const [listSubject, setListSubject] = useState([]);
  const [listChapter, setListChapter] = useState([]);
  const [chosenSubject, setChosenSubject] = useState(10000);

  axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
    "access_token"
  )}`;

  const handleClickSubject = (index: number) => {
    if (chosenSubject == index) {
      setChosenSubject(10000);
    } else {
      setChosenSubject(index);
    }
  };

  const getListSubject = async () => {
    const listSubject = await axios.get(`${BASE_URL}/pages/api/subjects`);
    return listSubject.data.subjects;
  };

  const getLearning = async () => {
    const leanring = await axios.get(`${BASE_URL}/pages/api/learning`);
    return leanring.data.learning;
  };

  const createNewSubject = async () => {
    const learning = await getLearning();
    const listSubject = await getListSubject();

    return await axios
      .post(`${BASE_URL}/pages/api/subjects`, {
        learningId: learning.id,
        title: "Untitled",
      })
      .then((subject) => console.log("successfully created subject: ", subject))
      .then(() => updateStateListSubject())
      .catch((err) => console.log("failed to create new subject: ", err));
  };

  const createNewChapter = async (
    e: React.MouseEvent<HTMLButtonElement>,
    subjectIndex: Number
  ) => {
    e.stopPropagation();
    return await axios.post(`${BASE_URL}/pages/api/chapters`, {
      subjectId: "100",
      title: "Untitled",
    });
  };

  const updateStateListSubject = async () => {
    const newListSubject = await getListSubject();
    setListSubject(newListSubject);
  };

  const updateStateListChapter = async () => {
    
  };

  useEffect(() => {
    updateStateListSubject();
  }, []);

  return (
    <div className="side-bar">
      <NavBarBoxItem key={"recent"}>
        <p style={{ fontWeight: "900", padding: "0px 10px", flexGrow: 1 }}>
          {" "}
          Recent{" "}
        </p>
      </NavBarBoxItem>

      <List disablePadding>
        {listSubject.map((subject: Subject, subjectIndex) => {
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
                    {subject.title}{" "}
                  </span>
                  <Button
                    sx={{
                      margin: 0,
                      padding: 0,
                      minWidth: "unset",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IconWrapper bgcolor="transparent">
                      <MoreHorizIcon />
                    </IconWrapper>
                  </Button>

                  <Button
                    sx={{
                      margin: 0,
                      padding: 0,
                      minWidth: "unset",
                    }}
                    onClick={(e) => createNewChapter(e, subjectIndex)}
                  >
                    <IconWrapper bgcolor="transparent">
                      <AddIcon />
                    </IconWrapper>
                  </Button>
                </NavBarBoxItem>
              </NavListItemButton>

              <ChapterList
                subjectIndex={subjectIndex}
                chosenSubject={chosenSubject}
                listChapter={listChapter}
              />
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
          onClick={createNewSubject}
        >
          <AddIcon sx={{ marginRight: "10px" }} /> New subject
        </Button>
      </div>
    </div>
  );
};
