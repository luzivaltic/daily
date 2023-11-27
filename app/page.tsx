'use client'
import "./page.css";
import { CookiesProvider, useCookies } from "next-client-cookies";
import ButtonAppBar from "./components/ButtonAppBar";
import { SideNavBar } from "./components/SideNavBar";
import { MainMenu } from "./components/MainMenu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  const cookies = useCookies();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const cookie = cookies.get('access_token');
    const valid = cookie !== undefined;
    setIsAuthorized(valid);

    if (!valid) {
      router.push('/pages/auth/login');
    }
  }, []);
  
  if (isAuthorized) {
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
  } else {
    return null;
  }
};

export default Home;
