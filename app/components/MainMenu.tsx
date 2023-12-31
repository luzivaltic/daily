import { useEffect, useState } from "react";
import { FlashCard } from "./FlashCard";
import { useRootContext } from "../Context";
import axios from "axios";
import { BASE_URL } from "../env";
import { BaseFlashCardProps } from "../page";
import PostAddIcon from "@mui/icons-material/PostAdd";
import QuizIcon from "@mui/icons-material/Quiz";
import { IconWrapper } from "./IconWrapper";
import { Button, Tooltip } from "@mui/material";
import { FlashcardDialog } from "./FlashcardDialog";

export const MainMenu = () => {
  const [flashCards, setFlashcards] = useState<BaseFlashCardProps[]>([]);
  const [selectedFlashcard, setSelectedFlashcard] = useState("");
  const [edit, setEdit] = useState(false);
  const RootContext = useRootContext();

  const getFlashcards = async () => {
    if (RootContext?.chapterId != "") {
      const flashcards: BaseFlashCardProps[] = await axios
        .get(`${BASE_URL}/api/flashcards/chapter_id/${RootContext?.chapterId}`)
        .then((res) => res.data.flashcards);
      return flashcards;
    }
    return [];
  };

  const addFlashcard = async () => {
    axios
      .post(`${BASE_URL}/api/flashcards`, {
        chapter_id: RootContext?.chapterId,
        front_content: "",
        back_content: "",
      })
      .then(() => updateFlashcards());
  };

  const deleteFlashcard = async (id: string) => {
    axios
      .delete(`${BASE_URL}/api/flashcards`, {
        data: {
          flashcard_id: id,
        },
      })
      .then(() => updateFlashcards());
  };

  const updateFlashcards = async () => {
    getFlashcards()
      .then((res) => setFlashcards(res))
      .then(() => changeContent());
  };

  const changeContent = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    updateFlashcards();
  }, [RootContext?.chapterId]);

  useEffect(() => {}, []);

  return (
    <div className="main-menu">
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
              onClick={() => RootContext?.setReadyTest(true)}
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
                  updateFlashcards={updateFlashcards}
                >
                  <FlashCard
                    flashcardData={flashCard}
                    key={flashCard.id}
                    onDelete={deleteFlashcard}
                    chooseFlashcard={setSelectedFlashcard}
                    edit={edit}
                    updateFlashcards={updateFlashcards}
                    editing={true}
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
                flashcardData={flashCard}
                key={`${flashCard.id}-flashcard`}
                onDelete={deleteFlashcard}
                chooseFlashcard={setSelectedFlashcard}
                edit={edit}
                updateFlashcards={updateFlashcards}
                editing={false}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
