"use client";
import "./page.css";
import ButtonAppBar from "./components/ButtonAppBar";
import { Chapter, SideNavBar } from "./components/SideNavBar";
import { MainMenu } from "./components/MainMenu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { context } from "./Context";
import axios from "axios";
import { ReadyTestMenu } from "./components/ReadyTestMenu";
import { SideNavBarTest } from "./components/SideNavBarTest";
import { SideNavBarTesting } from "./components/SideNavBarTesting";
import { TestingMenu } from "./components/TestingMenu";
import { BASE_URL } from "./env";

export type BaseFlashCardProps = {
  id: string;
  front_content: string;
  back_content: string;
};

const Home = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [chapterId, setChapterId] = useState("");
  const [readyTest, setReadyTest] = useState(false);
  const [testChapters, setTestChapters] = useState<Array<Chapter[]>>([
    [
      {
        id: "clq2b5f4d000hj1xxu5p2srek",
        subject_id: "clq13sutr001tj1gzdl94jjrx",
        title: "chapter of something",
      },
    ],
    [],
  ]);
  const [testing, setTesting] = useState(false);
  const [testFlashcards, setTestFlashcards] = useState<BaseFlashCardProps[]>(
    []
  );
  const [noteFlashcards, setNoteFlashcards] = useState<BaseFlashCardProps[]>(
    []
  );

  const [currentTestFlashcard, setCurrentTestFlashcard] =
    useState<BaseFlashCardProps>({
      id: "",
      front_content: "",
      back_content: "",
    });
  const [currentNoteFlashcard, setCurrentNoteFlashcard] =
    useState<BaseFlashCardProps>({
      id: "",
      front_content: "",
      back_content: "",
    });

  const updateData = (data: Array<Chapter[]>) => {
    setTestChapters(data);
  };

  const getTestingFlashcards = async () => {
    const testingFlashcards: BaseFlashCardProps[] = [];
    for (let i = 0; i < testChapters.length; i++) {
      for (let j = 0; j < testChapters[i].length; j++) {
        const res = await axios
          .get(`${BASE_URL}/pages/api/flashcards/${testChapters[i][j].id}`)
          .then((res) => res.data.flashcards);
        testingFlashcards.push(...res);
      }
    }
    return testingFlashcards;
  };

  const getCurrentIndex = () => {
    return testFlashcards.findIndex(
      (flashcard) => flashcard.id == currentTestFlashcard.id
    );
  };

  const changeCurrentNoteFlashcard = (content: string) => {
    const newNoteFlashcard: BaseFlashCardProps = {
      id: "",
      front_content: content,
      back_content: "",
    };
    const index = getCurrentIndex();
    const newNoteFlashcards = [...noteFlashcards];
    newNoteFlashcards[index] = newNoteFlashcard;
    setNoteFlashcards(newNoteFlashcards);
  };

  const movePrev = () => {
    const index = getCurrentIndex();
    if (index - 1 >= 0) {
      setCurrentTestFlashcard(testFlashcards[index - 1]);
    }
  };

  const moveNext = () => {
    const index = getCurrentIndex();
    if (index + 1 < testFlashcards.length) {
      setCurrentTestFlashcard(testFlashcards[index + 1]);
    }
  };

  useEffect(() => {
    const token = window.sessionStorage.getItem("access_token");
    const valid = token !== null;
    setIsAuthorized(valid);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    if (!valid) {
      router.push("/pages/auth/login");
    }
  }, []);

  useEffect(() => {}, [testChapters]);

  useEffect(() => {
    getTestingFlashcards().then((res) => {
      setTestFlashcards(res);
      setCurrentTestFlashcard(res[0]);
    });
  }, [testing]);

  useEffect(() => {
    setNoteFlashcards(
      new Array(testFlashcards.length).fill({
        id: "",
        front_content: "",
        back_content: "",
      })
    );
  }, [testFlashcards]);

  useEffect(() => {
    const index = getCurrentIndex();
    if (index >= 0) {
      setCurrentNoteFlashcard(noteFlashcards[index]);
    }
  }, [currentTestFlashcard]);

  if (isAuthorized) {
    return (
      <>
        <context.Provider
          value={{
            chapterId: chapterId,
            setChapterId: setChapterId,
            readyTest: readyTest,
            setReadyTest: setReadyTest,
            testing: testing,
            setTesting: setTesting,
            currentTestFlashcard: currentTestFlashcard,
            setCurrentTestFlashcard: setCurrentTestFlashcard,
          }}
        >
          <header>
            <ButtonAppBar />
          </header>
          <div className="container">
            {!testing && !readyTest && <SideNavBar />}
            {!testing && readyTest && <SideNavBarTest />}
            {testing && <SideNavBarTesting flashcards={testFlashcards} />}

            {!testing && !readyTest && <MainMenu />}
            {!testing && readyTest && <ReadyTestMenu updateData={updateData} />}
            {testing && (
              <TestingMenu
                noteFlashcard={currentNoteFlashcard}
                changeNote={changeCurrentNoteFlashcard}
                moveNext={moveNext}
                movePrev={movePrev}
              />
            )}
          </div>
        </context.Provider>
      </>
    );
  } else {
    return <div>Hello</div>;
  }
};

export default Home;
