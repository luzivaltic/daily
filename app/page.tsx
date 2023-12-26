"use client";
import "./page.css";
import ButtonAppBar from "./components/ButtonAppBar";
import { SideNavBar } from "./components/SideNavBar";
import { MainMenu } from "./components/MainMenu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = window.sessionStorage.getItem('access_token');
    console.log(token);
    const valid = token !== null;
    setIsAuthorized(valid);

    if (!valid) {
      router.push('/pages/auth/login');
    }
  }, []);
  
  if (isAuthorized) {
    return (
      <>
        <header>
          <ButtonAppBar />
        </header>
        <div className="container">
          <SideNavBar />
          <MainMenu />
        </div>    
      </>
    )
  } else {
    return (
      <div>
        Hello
      </div>
    )
  }
};

export default Home;
