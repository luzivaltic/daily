import { Editor } from "./Editor";
import { useRootContext } from "../Context";
import axios from "axios";
import { BASE_URL } from "../env";
import { Button, Divider, Tooltip } from "@mui/material";
import { IconWrapper } from "./IconWrapper";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { BaseFlashCardProps } from "../page";

interface FlashCardProps {
  flashcardData: BaseFlashCardProps;
  onDelete: (id: string) => Promise<void>;
  style?: React.CSSProperties;
  chooseFlashcard: (id: string) => void;
  updateFlashcards: () => void;
  edit: boolean;
  editing: boolean;
}

export const FlashCard = ({
  onDelete,
  style,
  chooseFlashcard,
  edit,
  flashcardData,
  updateFlashcards,
  editing,
}: FlashCardProps) => {
  const [enter, setEnter] = useState(false);
  const [focus, setFocus] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const RootContext = useRootContext();

  const onChange = async (content: string) => {
    axios.put(`${BASE_URL}/api/flashcards`, {
      flashcardId: flashcardData.id,
      frontContent: flipped ? flashcardData.front_content : content,
      backContent: flipped ? content : flashcardData.back_content,
    });
  };

  const defaultStyles: React.CSSProperties = {
    height: "300px",
    backgroundColor: "white",
    fontSize: "14px",
    borderRadius: "8px",
    overflowY: "auto",
    filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))",
    display: "flex",
    flexDirection: "column",
  };

  const mergedFlashcardStyle = { ...defaultStyles, ...style };

  return (
    <div
      className="flashcard"
      style={mergedFlashcardStyle}
      onMouseEnter={() => setEnter(true)}
      onMouseLeave={() => setEnter(false)}
      onFocus={() => {
        chooseFlashcard(flashcardData.id);
      }}
    >
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          padding: "8px",
        }}
      >
        <span
          style={{
            position: "absolute",
            alignSelf: "center",
            fontSize: "16px",
          }}
        >
          {flipped ? "Back" : "Front"}
        </span>

        <div
          style={{
            opacity: enter ? 1 : 0,
            alignSelf: "flex-end",
          }}
        >
          <Tooltip title="Delete">
            <Button
              sx={{
                margin: 0,
                padding: 0,
                minWidth: "unset",
              }}
              onClick={() => onDelete(flashcardData.id)}
            >
              <IconWrapper>
                <DeleteIcon />
              </IconWrapper>
            </Button>
          </Tooltip>
        </div>
      </header>

      <Divider
        variant="middle"
        sx={{
          mb: 1,
        }}
      />

      <Editor
        onChange={onChange}
        initialContent={
          flipped ? flashcardData.back_content : flashcardData.front_content
        }
        editable={edit}
      />

      <footer
        style={{
          display: "flex",
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {editing && (
          <Button
            variant="outlined"
            onClick={() => {
              setFlipped(!flipped);
              updateFlashcards();
            }}
          >
            {" "}
            Flip{" "}
          </Button>
        )}
        {focus && <Button variant="outlined"> Flip </Button>}
      </footer>
    </div>
  );
};
