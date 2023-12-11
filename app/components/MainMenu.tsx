import { useContext, useEffect } from "react";
import { FlashCard } from "./FlashCard";
import { useRootContext } from "../Context";
import axios from "axios";
import { BASE_URL } from "../env";

export const MainMenu = () => {
  const initialContent = `[
    {
      "id": "d5f5aaf9-efb8-4baf-9421-aeac245feb91",
      "type": "paragraph",
      "props": {
        "textColor": "default",
        "backgroundColor": "default",
        "textAlignment": "left"
      },
      "content": [
        {
          "type": "text",
          "text": "This is flashcard",
          "styles": {}
        }
      ],
      "children": []
    },
    {
      "id": "c1f94774-e477-43ed-aac0-b1545aeb3fa1",
      "type": "paragraph",
      "props": {
        "textColor": "default",
        "backgroundColor": "default",
        "textAlignment": "left"
      },
      "content": [],
      "children": []
    }
  ]`;
  const RootContext = useRootContext();

  const getFlashcards = async () => {
    if (RootContext?.chapterId != "") {
      const flashcards = await axios.get(
        `${BASE_URL}/pages/api/flashcards/${RootContext?.chapterId}`
      );
    }
    return "";
  };

  useEffect(() => {
    const flashcards = getFlashcards().then((res) =>
      console.log("lalaland", res)
    );
  }, []);

  return (
    <div
      className="main-menu"
      style={{
        padding: "20px",
      }}
    >
      <div
        className="flashcard-container"
        style={{
          display: "inline-grid",
          gridTemplateColumns: "auto auto auto",
          gap: "20px",
          width: "100%",
        }}
      >
        <FlashCard initialContent={initialContent} indexNumber={1} />
        <FlashCard initialContent={initialContent} indexNumber={2} />
        <FlashCard initialContent={initialContent} indexNumber={2} />
        <FlashCard initialContent={initialContent} indexNumber={2} />
        <FlashCard initialContent={initialContent} indexNumber={2} />
      </div>
    </div>
  );
};
