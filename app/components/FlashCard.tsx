import { Editor } from "./Editor";
import { useRootContext } from "../Context";
import axios from "axios";
import { BASE_URL } from "../env";
import { Button, Divider, Tooltip } from "@mui/material";
import { IconWrapper } from "./IconWrapper";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";

interface FlashCardProps {
  indexNumber: number;
  initialContent?: string;
  id: string;
  onDelete: (id: string) => Promise<void>;
  style?: React.CSSProperties;
  chooseFlashcard: (id: string) => void;
  edit: boolean;
}

export const FlashCard = ({
  initialContent,
  indexNumber,
  id,
  onDelete,
  style,
  chooseFlashcard,
  edit,
}: FlashCardProps) => {
  const [enter, setEnter] = useState(false);

  const onChange = async (content: string) => {
    await axios.put(`${BASE_URL}/pages/api/flashcards`, {
      flashcardId: id,
      frontContent: content,
      backContent: "",
    });
  };

  const defaultStyles: React.CSSProperties = {
    height: "300px",
    backgroundColor: "white",
    fontSize: "14px",
    borderRadius: "8px",
    overflowY: "auto",
    filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))",
  };

  const mergedFlashcardStyle = { ...defaultStyles, ...style };

  useEffect(() => {}, [initialContent]);

  return (
    <div
      className="flashcard"
      style={mergedFlashcardStyle}
      onMouseEnter={() => setEnter(true)}
      onMouseLeave={() => setEnter(false)}
      onFocus={() => chooseFlashcard(id)}
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
          {" "}
          Front{" "}
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
              onClick={() => onDelete(id)}
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
        initialContent={initialContent}
        editable={edit}
      />
    </div>
  );
};
