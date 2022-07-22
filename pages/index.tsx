import { Button } from "@mui/material";
import { useState } from "react";
import Navbar from "../components/navbar/navbar";

const Home = () => {

  return (
    <>
    <Navbar/>
<div>Hello World!</div>
  <Button color = "primary" variant = "outlined">Click me!!</Button>
    </>

    );
};

export default Home;
