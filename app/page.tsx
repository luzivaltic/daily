'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CookiesProvider, useCookies } from "next-client-cookies";

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
      <div>
        Main Page
      </div>
    </CookiesProvider>
  )
};

export default Home;