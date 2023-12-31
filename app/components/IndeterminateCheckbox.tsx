import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { SubjectsWithChapters } from "./ReadyTestMenu";
import { FormGroup } from "@mui/material";
import { Chapter } from "./SideNavBar";

type CheckboxProps = {
  subjectWithChapters: SubjectsWithChapters;
  updateData: (index: number, data: any) => void;
  subjectIndex: number;
};

export default function IndeterminateCheckbox({
  subjectWithChapters,
  updateData,
  subjectIndex,
}: CheckboxProps) {
  const [parentChecked, setParentChecked] = React.useState(false);
  const [childrenChecked, setChildrenChecked] = React.useState<boolean[]>(
    new Array(subjectWithChapters.chapters.length).fill(false)
  );

  const handleParentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setParentChecked(isChecked);
    setChildrenChecked(
      new Array(subjectWithChapters.chapters.length).fill(isChecked)
    );

    if (isChecked) {
      updateData(subjectIndex, subjectWithChapters.chapters);
    } else {
      updateData(subjectIndex, []);
    }
  };

  const handleChildChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChildrenChecked = [...childrenChecked];
      newChildrenChecked[index] = event.target.checked;
      setChildrenChecked(newChildrenChecked);

      const allChildrenChecked = newChildrenChecked.every((checked) => checked);
      setParentChecked(allChildrenChecked);

      const checkedChapters: Chapter[] = [];
      for (let i = 0; i < childrenChecked.length; i++) {
        if (newChildrenChecked[i]) {
          checkedChapters.push(subjectWithChapters.chapters[i]);
        }
      }
      updateData(subjectIndex, checkedChapters);
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
