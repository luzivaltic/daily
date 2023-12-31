import { Button, List } from "@mui/material";
import { NavBarBoxItem } from "./NavBarBoxItem";
import { BaseFlashCardProps } from "../page";
import { NavListItemButton } from "./NavListItemButton";
import { useRootContext } from "../Context";
import React from "react";

type TestDataProps = {
  flashcards: BaseFlashCardProps[];
};

export const SideNavBarTesting = ({ flashcards }: TestDataProps) => {
  const RootContext = useRootContext();

  const bgGray: React.CSSProperties = {
    backgroundColor: "gray",
  };

  return (
    <div className="side-bar">
      <NavBarBoxItem>
        <p
          style={{
            padding: "0px 10px",
            flexGrow: 1,
            fontSize: "16px",
            textTransform: "uppercase",
          }}
        >
          Test your knowledge
        </p>
      </NavBarBoxItem>

      <List
        disablePadding
        sx={{
          maxHeight: "70vh",
          overflow: "auto",
        }}
      >
        {flashcards.map((flashcard, index) => {
          return (
            <NavListItemButton
              key={`${flashcard.id}-testing-list-button`}
              onClick={() => {
                RootContext?.setCurrentTestFlashcard(flashcard);
              }}
              style={
                flashcard.id == RootContext?.currentTestFlashcard.id
                  ? bgGray
                  : undefined
              }
              disableRipple={true}
            >
              <NavBarBoxItem key={`${flashcard.id}-testing-box-item`}>
                <span
                  style={{
                    whiteSpace: "nowrap",
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    padding: "5px",
                  }}
                >
                  {`Flashcard #${index}`}
                </span>
              </NavBarBoxItem>
            </NavListItemButton>
          );
        })}
      </List>

      <div
        style={{
          marginTop: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            color: "black",
            borderRadius: "100px",
            padding: "10px 50px",
          }}
          onClick={() => {
            RootContext?.setTesting(false);
            RootContext?.setReadyTest(false);
          }}
        >
          Finish
        </Button>
      </div>
    </div>
  );
};
