"use client";
import "./page.css";
import ButtonAppBar from "./components/ButtonAppBar";
import { SideNavBar } from "./components/SideNavBar";
import { MainMenu } from "./components/MainMenu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { context } from "./Context";
import axios from "axios";
import { BASE_URL } from "./env";

export type FlashCardProps = {
  id: string;
  front_content: string;
  back_content: string;
};

const Home = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [chapterId, setChapterId] = useState("");

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
        <context.Provider value={{ chapterId, setChapterId }}>
          <header>
            <ButtonAppBar />
          </header>
          <div className="container">
            <SideNavBar />
            <MainMenu />
          </div>
        </context.Provider>
      </>
    );
  } else {
    return <div>Hello</div>;
  }
};

export default Home;
