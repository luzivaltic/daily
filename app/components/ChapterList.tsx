import { Collapse } from "@mui/material";
import { NavListItemButton } from "./NavListItemButton";
import { NavBarBoxItem } from "./NavBarBoxItem";
import { IconWrapper } from "./IconWrapper";
import ArticleIcon from "@mui/icons-material/Article";
import { useRootContext } from "../Context";

type ChapterListProps = {
  subjectIndex: number;
  chosenSubject: number;
  listChapter: Array<any>;
};

export const ChapterList = ({
  subjectIndex,
  chosenSubject,
  listChapter,
}: ChapterListProps) => {
  const RootContext = useRootContext();
  return (
    <Collapse in={subjectIndex == chosenSubject} timeout="auto" unmountOnExit>
      {listChapter.map((chapter) => {
        return (
          <NavListItemButton
            style={{
              marginLeft: "20px",
            }}
            key={chapter.id}
            onClick={() => RootContext?.setChapterId(chapter.id)}
          >
            <NavBarBoxItem>
              <IconWrapper>
                <ArticleIcon />
              </IconWrapper>
              <span style={{ marginLeft: "10px" }}> {chapter.title} </span>
            </NavBarBoxItem>
          </NavListItemButton>
        );
      })}
    </Collapse>
  );
};
