import { Button, Collapse, Input, Tooltip } from "@mui/material";
import { NavListItemButton } from "./NavListItemButton";
import { NavBarBoxItem } from "./NavBarBoxItem";
import { IconWrapper } from "./IconWrapper";
import ArticleIcon from "@mui/icons-material/Article";
import { useRootContext } from "../Context";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";

type ChapterListProps = {
  subjectIndex: number;
  chosenSubject: number;
  listChapter: Array<any>;
  handleDeleteChapter: (chapterId: string) => void;
  handleClickChapter: (chapterId: string) => void;
  handleChangeChapter: (chapterId: string, title: string) => void;
};

export const ChapterList = ({
  subjectIndex,
  chosenSubject,
  listChapter,
  handleDeleteChapter,
  handleClickChapter,
  handleChangeChapter,
}: ChapterListProps) => {
  const [hovering, setHovering] = useState("");
  const RootContext = useRootContext();

  const selectedChapter: React.CSSProperties = {
    backgroundColor: "gray",
    marginLeft: "20px",
  };

  const defaultCssNavListItemButton: React.CSSProperties = {
    marginLeft: "20px",
  };

  return (
    <Collapse in={subjectIndex == chosenSubject} timeout="auto" unmountOnExit>
      {listChapter.map((chapter) => {
        return (
          <NavListItemButton
            style={
              chapter.id == RootContext?.chapterId
                ? selectedChapter
                : defaultCssNavListItemButton
            }
            key={chapter.id}
            onClick={() => handleClickChapter(chapter.id)}
            onMouseEnter={() => setHovering(chapter.id)}
            onMouseLeave={() => setHovering("")}
          >
            <NavBarBoxItem>
              <IconWrapper>
                <ArticleIcon />
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
                  defaultValue={chapter.title}
                  disableUnderline={true}
                  onChange={(e) =>
                    handleChangeChapter(chapter.id, e.currentTarget.value)
                  }
                />
              </span>

              {hovering == chapter.id && (
                <Tooltip title="Delete chapter">
                  <Button
                    sx={{
                      margin: 0,
                      padding: 0,
                      minWidth: "unset",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChapter(chapter.id);
                    }}
                  >
                    <IconWrapper bgcolor="transparent">
                      <DeleteIcon />
                    </IconWrapper>
                  </Button>
                </Tooltip>
              )}
            </NavBarBoxItem>
          </NavListItemButton>
        );
      })}
    </Collapse>
  );
};
