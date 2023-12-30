import { createContext, useContext, useState } from "react";

export type ContextType = {
  chapterId: string;
  setChapterId: React.Dispatch<React.SetStateAction<string>>;
  readyTest: boolean;
  setReadyTest: React.Dispatch<React.SetStateAction<boolean>>;
};

export const context = createContext<ContextType | null>(null);

export const useRootContext = () => {
  const curContext = useContext(context);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return curContext;
};
