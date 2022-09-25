import { useRouter } from "next/router";
import { Wrapper } from "./navbar.styles";
import React from "react";
const Navbar = () => {
  const { pathname } = useRouter();
  console.log(pathname);
  if (pathname === "/arcade") {
    return (
      <Wrapper>
        <header>Arcade</header>
      </Wrapper>
    );
  }
  if (pathname === "/") {
    return (
      <Wrapper>
        <header>Home</header>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <header>Nothin' Here</header>
    </Wrapper>
  );
};

export default Navbar;
