import React from "react";
import styled from "styled-components";
import Check from "../../components/Check";
import User from "../../components/User";
import { useAuth } from "../../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
import { SideBar } from "./components";

const Container = styled.div`
  /* display: flex; */
`;

const Map = styled.div`
  text-align: center;
  width: 100vw;
  border: 1px solid black;
`;

const NearStore = () => {
  const { isAuthenticated } = useAuth();
  // const navigate = useNavigate();
  // console.log("isAuthenticated: ", isAuthenticated);
  if (!isAuthenticated) {
    // navigate("/");
    // return null;
  }

  return (
    <Container>
      <User />
      <Check />
      <SideBar />
      <Map>map</Map>
    </Container>
  );
};

export default NearStore;
