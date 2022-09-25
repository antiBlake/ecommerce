import { UserProvider } from "@auth0/nextjs-auth0";
import type { AppProps } from "next/app";
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";
import { GlobalStyle } from "../GlobalStyles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider>
        <Navbar />
        <main
          style={{
            padding: "15vmin 0",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Component {...pageProps} />
        </main>
        <Footer />
      </UserProvider>
      <GlobalStyle />
    </>
  );
}

export default MyApp;
