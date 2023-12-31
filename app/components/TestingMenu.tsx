import { Button } from "@mui/material";
import { FlashCard } from "./FlashCard";
import axios from "axios";
import { useRootContext } from "../Context";
import { useEffect, useState } from "react";
import { BaseFlashCardProps } from "../page";

type TestingMenuProps = {
  noteFlashcard: BaseFlashCardProps;
  changeNote: (content: string) => void;
  changeMarked: (marked: boolean) => void;
  mark: boolean;
  movePrev: () => void;
  moveNext: () => void;
};

export const TestingMenu = ({
  noteFlashcard,
  changeNote,
  moveNext,
  movePrev,
  changeMarked,
  mark,
}: TestingMenuProps) => {
  const RootContext = useRootContext();
  const testingOnDelete = (id: string) => {
    return new Promise<void>((resolve, reject) => {});
  };
  const [changeContent, setChangeContent] = useState(false);

  useEffect(() => {
    setChangeContent(!changeContent);
  }, [RootContext?.currentTestFlashcard]);

  useEffect(() => {
    setChangeContent(!changeContent);
  }, [noteFlashcard]);

  useEffect(() => {}, []);

  return (
    <div
      className="main-menu"
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        className="flashcard-container"
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexGrow: 1,
          width: "100%",
        }}
      >
        {RootContext?.currentTestFlashcard && (
          <FlashCard
            onDelete={testingOnDelete}
            flashcardData={RootContext.currentTestFlashcard}
            chooseFlashcard={function (id: string): void {}}
            updateFlashcards={() => {
              setChangeContent(!changeContent);
            }}
            edit={changeContent}
            editing={false}
            style={{
              width: "400px",
              height: "500px",
            }}
            markButton={true}
            marked={mark}
            changeMarked={changeMarked}
            flipButton={true}
          />
        )}
        {noteFlashcard && (
          <FlashCard
            onDelete={testingOnDelete}
            flashcardData={noteFlashcard}
            chooseFlashcard={function (id: string): void {}}
            updateFlashcards={function (): void {}}
            edit={changeContent}
            editing={false}
            style={{
              width: "400px",
              height: "500px",
            }}
            headerContent="Your note"
            changeNote={changeNote}
          />
        )}
      </div>

      <footer
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          color="primary"
          variant="outlined"
          sx={{
            fontSize: "16px",
            padding: "5px 50px",
            borderRadius: "8px",
          }}
          onClick={movePrev}
        >
          {" "}
          Prev{" "}
        </Button>
        <Button
          color="primary"
          variant="outlined"
          sx={{
            fontSize: "16px",
            padding: "5px 50px",
            borderRadius: "8px",
          }}
          onClick={moveNext}
        >
          {" "}
          Next{" "}
        </Button>
      </footer>
    </div>
  );
};
