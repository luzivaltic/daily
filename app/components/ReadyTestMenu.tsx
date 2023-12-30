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

export const ReadyTestMenu = () => {
  const [subjectsWithChapters, setSubjectsWithChapters] = useState<
    SubjectsWithChapters[]
  >([]);

  const getSubjectsWithChapters = async () => {
    const subjects = await axios
      .get(`${BASE_URL}/pages/api/subjects`)
      .then((res) => res.data.subjects);

    const subjectsWithChapters: SubjectsWithChapters[] = [];

    for (let i = 0; i < subjects.length; i++) {
      const chapters = await axios.get(
        `${BASE_URL}/pages/api/chapters/${subjects[i].id}`
      );
      const subjectWithChapters: SubjectsWithChapters = {
        id: subjects[i].id,
        title: subjects[i].title,
        chapters: chapters.data.chapters,
      };

      subjectsWithChapters.push(subjectWithChapters);
    }
    setSubjectsWithChapters(subjectsWithChapters);
  };

  useEffect(() => {
    getSubjectsWithChapters();
  }, []);

  return (
    <div
      className="ready-test-menu"
      style={{ padding: "20px" }}
    >
      {subjectsWithChapters.map((subjectWithChapters) => {
        return (
          <IndeterminateCheckbox
            subjectWithChapters={subjectWithChapters}
            key={`${subjectWithChapters.id}-indeterminate-checkbox`}
          />
        );
      })}
    </div>
  );
};
