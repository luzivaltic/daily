"use client";
import "./page.css";
import ButtonAppBar from "./components/ButtonAppBar";
import { SideNavBar } from "./components/SideNavBar";
import { MainMenu } from "./components/MainMenu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { context } from "./Context";
import axios from "axios";
import { ReadyTestMenu } from "./components/ReadyTestMenu";
import { SideNavBarTest } from "./components/SideNavBarTest";

export type BaseFlashCardProps = {
  id: string;
  front_content: string;
  back_content: string;
};

const Home = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [chapterId, setChapterId] = useState("");
  const [readyTest, setReadyTest] = useState(true);

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${window.sessionStorage.getItem("access_token")}`;

  useEffect(() => {
    const token = window.sessionStorage.getItem("access_token");
    const valid = token !== null;
    setIsAuthorized(valid);

    if (!valid) {
      router.push("/pages/auth/login");
    }
  }, []);

  useEffect(() => {}, [chapterId]);

  if (isAuthorized) {
    return (
      <>
        <context.Provider
          value={{
            chapterId: chapterId,
            setChapterId: setChapterId,
            readyTest: readyTest,
            setReadyTest: setReadyTest,
          }}
        >
          <header>
            <ButtonAppBar />
          </header>
          <div className="container">
            {!readyTest && <SideNavBar />}
            {readyTest && <SideNavBarTest />}

            {!readyTest && <MainMenu />}
            {readyTest && <ReadyTestMenu />}
          </div>
        </context.Provider>
      </>
    );
  } else {
    return <div>Hello</div>;
  }
};

export default Home;
