import axios from "axios";
import { BASE_URL } from "../env";
import IndeterminateCheckbox from "./IndeterminateCheckbox";
import { useEffect, useState } from "react";
import { Chapter, Subject } from "./SideNavBar";

export type SubjectsWithChapters = {
  id: string;
  title: string;
  chapters: Chapter[];
};

type ReadyTestProps = {
  updateData: (data: Array<Chapter[]>) => void;
};

export const ReadyTestMenu = ({ updateData }: ReadyTestProps) => {
  const [subjectsWithChapters, setSubjectsWithChapters] = useState<
    SubjectsWithChapters[]
  >([]);

  const [checkboxData, setCheckboxData] = useState<Array<Chapter[]>>([]);

  const getSubjectsWithChapters = async () => {
    const subjects = await axios
      .get(`${BASE_URL}/api/subjects`)
      .then((res) => res.data.subjects);

    const data: SubjectsWithChapters[] = [];

    for (let i = 0; i < subjects.length; i++) {
      const chapters = await axios.get(
        `${BASE_URL}/api/chapters/${subjects[i].id}`
      );
      const subjectWithChapters: SubjectsWithChapters = {
        id: subjects[i].id,
        title: subjects[i].title,
        chapters: chapters.data.chapters,
      };

      data.push(subjectWithChapters);
    }
    setSubjectsWithChapters(data);
  };

  const updateCheckboxData = (index: number, data: any) => {
    const newData = [...checkboxData];
    newData[index] = data;
    setCheckboxData(newData);
  };

  useEffect(() => {
    getSubjectsWithChapters().then(() =>
      setCheckboxData(new Array(subjectsWithChapters.length).fill([]))
    );
  }, []);

  useEffect(() => {
    setCheckboxData(new Array(subjectsWithChapters.length).fill([]));
  }, [subjectsWithChapters]);

  useEffect(() => {
    updateData(checkboxData);
  }, [checkboxData]);

  return (
    <div className="ready-test-menu">
      {subjectsWithChapters.map((subjectWithChapters, index) => {
        return (
          <IndeterminateCheckbox
            subjectWithChapters={subjectWithChapters}
            key={`${subjectWithChapters.id}-indeterminate-checkbox`}
            subjectIndex={index}
            updateData={updateCheckboxData}
          />
        );
      })}
    </div>
  );
};
