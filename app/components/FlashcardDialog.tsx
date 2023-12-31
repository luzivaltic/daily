import { Dialog, DialogTitle } from "@mui/material";
import { revalidatePath } from "next/cache";
import { ReactNode, useState } from "react";
import { useRootContext } from "../Context";

interface DialogProps {
  children: ReactNode;
  chooseFlashcard: (id: string) => void;
  updateFlashcards: () => void;
}

export const FlashcardDialog = ({
  children,
  chooseFlashcard,
  updateFlashcards,
}: DialogProps) => {
  const [open, setOpen] = useState(true);
  const [reloadContent, setReloadContent] = useState(false);

  return (
    <Dialog
      open={open}
      onClose={async () => {
        setOpen(false);
        chooseFlashcard("");
        updateFlashcards();
      }}
    >
      {children}
    </Dialog>
  );
};
