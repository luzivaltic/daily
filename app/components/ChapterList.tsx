import { Collapse } from "@mui/material";
import { NavListItemButton } from "./NavListItemButton";
import { NavBarBoxItem } from "./NavBarBoxItem";
import { IconWrapper } from "./IconWrapper";
import ArticleIcon from "@mui/icons-material/Article";


type ChapterListProps = {
  subjectIndex: Number;
  chosenSubject: Number;
  listChapter: Array<any>;
};

export const ChapterList = ({
  subjectIndex,
  chosenSubject,
  listChapter,
}: ChapterListProps) => {
  return (
    <Collapse in={subjectIndex == chosenSubject} timeout="auto" unmountOnExit>
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
              <span style={{ marginLeft: "10px" }}> {chapterName} </span>
            </NavBarBoxItem>
          </NavListItemButton>
        );
      })}
    </Collapse>
  );
};
