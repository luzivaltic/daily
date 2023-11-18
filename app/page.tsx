'use client'
import "./page.css";
import { CookiesProvider, useCookies } from "next-client-cookies";
import ButtonAppBar from "./components/ButtonAppBar";
import { SideNavBar } from "./components/SideNavBar";
import { MainMenu } from "./components/MainMenu";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const cookies = useCookies();

  const isAuthorizeUser = () => {
    const cookie = cookies.get('access_token');
    return cookie != undefined;
  };

  useEffect(() => {
    if (isAuthorizeUser() === false) {
      router.replace('/pages/auth/login');
    }
  }, []);
  return (
    <CookiesProvider value={[]}>
      <header>
        <ButtonAppBar />
      </header>
      <div className="container">
        <SideNavBar />
        <MainMenu />
      </div>    
      </CookiesProvider>
  )
};

export default Home;
