import { Editor } from "./Editor";
import "../styles/FlashCard.css";
import { useRootContext } from "../Context";

interface FlashCardProps {
  indexNumber: number;
  initialContent?: string;
}

export const FlashCard = ({ initialContent, indexNumber }: FlashCardProps) => {
  const RootContext = useRootContext();

  const onChange = (content: string) => {
    console.log("change");
    // console.log(content);
  };

  return (
    <div
      className="flashcard"
      style={{
        height: "250px",
        backgroundColor: "white",
        fontSize: "14px",
        borderRadius: "8px",
        overflowY: "auto",
        filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))",
      }}
    >
      <Editor onChange={onChange} initialContent={initialContent} />
    </div>
  );
};
