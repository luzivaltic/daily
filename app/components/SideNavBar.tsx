"use client";
import { Button, Input, List, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { IconWrapper } from "./IconWrapper";
import { NavBarBoxItem } from "./NavBarBoxItem";
import { NavListItemButton } from "./NavListItemButton";
import React, { useEffect, useState } from "react";
import { ChapterList } from "./ChapterList";
import axios from "axios";
import { BASE_URL } from "../env";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRootContext } from "../Context";

export type Subject = {
  id: string;
  title: string;
};

export type Chapter = {
  id: string;
  title: string;
  subject_id: string;
};

export const SideNavBar = () => {
  const [listSubject, setListSubject] = useState<Subject[]>([]);
  const [listChapter, setListChapter] = useState<Chapter[]>([]);
  const [chosenSubject, setChosenSubject] = useState(-1);
  const [hovering, setHovering] = useState("");
  const RootContext = useRootContext();

  const handleClickSubject = (index: number) => {
    if (chosenSubject != index) {
      setChosenSubject(index);
    }
  };

  const handleDeleteSubject = async (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    if (index == chosenSubject) {
      setChosenSubject(-1);
    }
    return axios
      .delete(`${BASE_URL}/api/subjects`, {
        data: {
          subject_id: listSubject[index]?.id,
        },
      })
      .then(() => updateStateListSubject());
  };

  const handleChangeSubject = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    subjectIndex: number
  ) => {
    event.stopPropagation();
    return axios.put(`${BASE_URL}/api/subjects`, {
      subject_id: listSubject[subjectIndex].id,
      title: event.currentTarget.value,
    });
  };

  const getListSubject = async () => {
    const listSubject = await axios.get(`${BASE_URL}/api/subjects`);
    return listSubject.data.subjects;
  };

  const getLearning = async () => {
    const leanring = await axios.get(`${BASE_URL}/api/learnings`);
    return leanring.data.learning;
  };

  const createNewSubject = async () => {
    const learning = await getLearning();

    return axios
      .post(`${BASE_URL}/api/subjects`, {
        learning_id: learning?.id,
        title: "Untitled",
      })
      .then((subject) => console.log("successfully created subject: ", subject))
      .then(() => updateStateListSubject())
      .catch((err) => console.log("failed to create new subject: ", err));
  };

  const getListChapter = async (subjectId: string) => {
    const listChapter = await axios.get(
      `${BASE_URL}/api/chapters/${subjectId}`
    );
    return listChapter.data.chapters;
  };

  const createNewChapter = async (
    e: React.MouseEvent<HTMLButtonElement>,
    subjectIndex: number
  ) => {
    e.stopPropagation();
    return axios
      .post(`${BASE_URL}/api/chapters`, {
        subject_id: listSubject[subjectIndex]?.id,
        title: "Untitled",
      })
      .then(() => updateStateListChapter());
  };

  const handleDeleteChapter = (chapterId: string) => {
    if (chapterId == RootContext?.chapterId) {
      RootContext?.setChapterId("");
    }
    axios
      .delete(`${BASE_URL}/api/chapters`, {
        data: {
          chapter_id: chapterId,
        },
      })
      .then(() => updateStateListChapter());
  };

  const handleChangeChapter = (chapterId: string, title: string) => {
    axios.put(`${BASE_URL}/api/chapters`, {
      chapter_id: chapterId,
      title: title,
    });
  };

  const handleClickChapter = (chapterId: string) => {
    RootContext?.setChapterId(chapterId);
  };

  const updateStateListSubject = async () => {
    const newListSubject = await getListSubject();
    setListSubject(newListSubject);
  };

  const updateStateListChapter = async () => {
    if (chosenSubject != 10000) {
      const newListChapter = await getListChapter(
        listSubject[chosenSubject]?.id
      );
      setListChapter(newListChapter);
    }
  };

  useEffect(() => {
    updateStateListChapter();
  }, [chosenSubject]);

  useEffect(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${window.sessionStorage.getItem("access_token")}`;

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

      <List
        disablePadding
        sx={{
          maxHeight: "70vh",
          overflow: "auto",
        }}
        key={"list-side-bar"}
      >
        {listSubject.map((subject: Subject, subjectIndex) => {
          return (
            <>
              <NavListItemButton
                key={subject.id}
                onClick={() => handleClickSubject(subjectIndex)}
                onMouseEnter={() => setHovering(subject.id)}
                onMouseLeave={() => setHovering("")}
              >
                <NavBarBoxItem key={`${subject.id}-item`}>
                  <IconWrapper>
                    {subjectIndex == chosenSubject ? (
                      <ExpandMore />
                    ) : (
                      <LocalLibraryIcon />
                    )}
                  </IconWrapper>

                  <span
                    style={{
                      marginLeft: "10px",
                      whiteSpace: "nowrap",
                      flex: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Input
                      defaultValue={subject.title}
                      disableUnderline={true}
                      onChange={(e) => handleChangeSubject(e, subjectIndex)}
                    />
                  </span>

                  {hovering == subject.id && (
                    <Tooltip title="Delete subject">
                      <Button
                        sx={{
                          margin: 0,
                          padding: 0,
                          minWidth: "unset",
                        }}
                        onClick={(e) => handleDeleteSubject(e, subjectIndex)}
                      >
                        <IconWrapper bgcolor="transparent">
                          <DeleteIcon />
                        </IconWrapper>
                      </Button>
                    </Tooltip>
                  )}

                  {hovering == subject.id && (
                    <Tooltip title="New chapter">
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
                    </Tooltip>
                  )}
                </NavBarBoxItem>
              </NavListItemButton>

              <ChapterList
                subjectIndex={subjectIndex}
                chosenSubject={chosenSubject}
                listChapter={listChapter}
                handleDeleteChapter={handleDeleteChapter}
                handleClickChapter={handleClickChapter}
                handleChangeChapter={handleChangeChapter}
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
