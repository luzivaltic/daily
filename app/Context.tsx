import { Chapter } from "@prisma/client";
import { createContext, useContext, useState } from "react";
import { BaseFlashCardProps } from "./page";

export type ContextType = {
  chapterId: string;
  setChapterId: React.Dispatch<React.SetStateAction<string>>;
  readyTest: boolean;
  setReadyTest: React.Dispatch<React.SetStateAction<boolean>>;
  testing: boolean;
  setTesting: React.Dispatch<React.SetStateAction<boolean>>;
  currentTestFlashcard: BaseFlashCardProps;
  setCurrentTestFlashcard: React.Dispatch<
    React.SetStateAction<BaseFlashCardProps>
  >;
};

export const context = createContext<ContextType | null>(null);

export const useRootContext = () => {
  const curContext = useContext(context);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return curContext;
};
