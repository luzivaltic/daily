import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { SubjectsWithChapters } from "./ReadyTestMenu";
import { FormGroup } from "@mui/material";

type CheckboxProps = {
  subjectWithChapters: SubjectsWithChapters;
};

export default function IndeterminateCheckbox({
  subjectWithChapters,
}: CheckboxProps) {
  const [parentChecked, setParentChecked] = React.useState(false);
  const [childrenChecked, setChildrenChecked] = React.useState(
    new Array(subjectWithChapters.chapters.length).fill(false)
  );

  const handleParentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setParentChecked(isChecked);
    setChildrenChecked(
      new Array(subjectWithChapters.chapters.length).fill(isChecked)
    );
  };

  const handleChildChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChildrenChecked = [...childrenChecked];
      newChildrenChecked[index] = event.target.checked;
      setChildrenChecked(newChildrenChecked);

      const allChildrenChecked = newChildrenChecked.every((checked) => checked);
      setParentChecked(allChildrenChecked);
    };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox checked={parentChecked} onChange={handleParentChange} />
        }
        label={subjectWithChapters.title}
      />
      {subjectWithChapters.chapters.map((chapter, index) => (
        <FormControlLabel
          key={index}
          sx={{ ml: 3 }}
          control={
            <Checkbox
              checked={childrenChecked[index]}
              onChange={handleChildChange(index)}
            />
          }
          label={`${chapter.title}`}
        />
      ))}
    </FormGroup>
  );
}
