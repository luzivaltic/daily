import { useEffect, useState } from "react";
import { FlashCard } from "./FlashCard";
import { useRootContext } from "../Context";
import axios from "axios";
import { BASE_URL } from "../env";
import { FlashCardProps } from "../page";
import PostAddIcon from "@mui/icons-material/PostAdd";
import QuizIcon from "@mui/icons-material/Quiz";
import { IconWrapper } from "./IconWrapper";
import { Button, Tooltip } from "@mui/material";
import IndeterminateCheckbox from "./IndeterminateCheckbox";
import { FlashcardDialog } from "./FlashcardDialog";

export const MainMenu = () => {
  const [flashCards, setFlashcards] = useState<FlashCardProps[]>([]);
  const [selectedFlashcard, setSelectedFlashcard] = useState("");
  const [edit, setEdit] = useState(false);
  const RootContext = useRootContext();

  const getFlashcards = async () => {
    if (RootContext?.chapterId != "") {
      const flashcards: FlashCardProps[] = await axios
        .get(`${BASE_URL}/pages/api/flashcards/${RootContext?.chapterId}`)
        .then((res) => res.data.flashcards);
      return flashcards;
    }
    return [];
  };

  const addFlashcard = async () => {
    axios
      .post(`${BASE_URL}/pages/api/flashcards`, {
        chapterId: RootContext?.chapterId,
        frontContent: "",
        backContent: "",
      })
      .then(() => updateFlashcards());
  };

  const deleteFlashcard = async (id: string) => {
    axios
      .delete(`${BASE_URL}/pages/api/flashcards`, {
        data: {
          flashcardId: id,
        },
      })
      .then(() => updateFlashcards());
  };

  const updateFlashcards = async () => {
    await getFlashcards()
      .then((res) => setFlashcards(res))
      .then(() => changeContent());
  };

  const changeContent = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    updateFlashcards();
  }, [RootContext?.chapterId]);

  return (
    <div
      className="main-menu"
      style={{
        padding: "20px",
      }}
    >
      <IndeterminateCheckbox />

      <div
        className="function-bar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <span
          className="name"
          style={{
            fontSize: "20px",
          }}
        >
          {" "}
          Flashcards{" "}
        </span>

        <div
          className="function"
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Tooltip title="Add flashcard">
            <Button
              sx={{
                margin: 0,
                padding: 0,
                minWidth: "unset",
              }}
              onClick={addFlashcard}
            >
              <IconWrapper>
                <PostAddIcon />
              </IconWrapper>
            </Button>
          </Tooltip>

          <Tooltip title="Take a test">
            <Button
              sx={{
                margin: 0,
                padding: 0,
                minWidth: "unset",
              }}
            >
              <IconWrapper>
                <QuizIcon />
              </IconWrapper>
            </Button>
          </Tooltip>
        </div>
      </div>

      {flashCards && (
        <div
          className="flashcard-container"
          style={{
            display: "inline-grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
            width: "100%",
          }}
        >
          {flashCards.map((flashCard, index) => {
            if (flashCard.id == selectedFlashcard) {
              return (
                <FlashcardDialog
                  key={`${flashCard.id}-dialog`}
                  chooseFlashcard={setSelectedFlashcard}
                  changeContent={changeContent}
                  updateFlashcards={updateFlashcards}
                >
                  <FlashCard
                    initialContent={flashCard.front_content}
                    indexNumber={index}
                    key={flashCard.id}
                    id={flashCard.id}
                    onDelete={deleteFlashcard}
                    chooseFlashcard={setSelectedFlashcard}
                    edit={edit}
                    style={{
                      width: "500px",
                      height: "700px",
                    }}
                  />
                </FlashcardDialog>
              );
            }

            return (
              <FlashCard
                initialContent={flashCard.front_content}
                indexNumber={index}
                key={flashCard.id}
                id={flashCard.id}
                onDelete={deleteFlashcard}
                chooseFlashcard={setSelectedFlashcard}
                edit={edit}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
