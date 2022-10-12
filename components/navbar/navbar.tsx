import { useRouter } from "next/router";
import { Wrapper } from "./navbar.styles";
import React from "react";
import { LocalMall } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { useShoppingCart } from "../../context/shoppingCart";
import Button from "@mui/material/Button";
const Navbar = () => {
  const { pathname } = useRouter();
  const { getCartQuantity, cartOpen, setCartOpen } = useShoppingCart();

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
        <Button
          onClick={() => {
            setCartOpen(true);
          }}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            color: "grey",
          }}
        >
          <Badge
            badgeContent={getCartQuantity()}
            color="error"
            overlap="rectangular"
          >
            <LocalMall fontSize="medium" style={{ color: "black" }} />
          </Badge>
        </Button>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <header>Nothin Here</header>
    </Wrapper>
  );
};

export default Navbar;
