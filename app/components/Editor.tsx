"use client";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useEffect } from "react";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const editor: BlockNoteEditor = useBlockNote(
    {
      initialContent: initialContent
        ? (JSON.parse(initialContent) as PartialBlock[])
        : undefined,

      onEditorContentChange: (editor) => {
        onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
      },
    },
    [editable]
  );

  useEffect(() => {}, []);

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        maxHeight: "90%",
      }}
    >
      <BlockNoteView editor={editor} theme={"light"} />
    </div>
  );
};
