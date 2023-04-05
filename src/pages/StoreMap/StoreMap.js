import React from "react";
import styled from "styled-components";
import Check from "../../components/Check";
import User from "../../components/User";
import { useAuth } from "../../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
import { SideBar } from "./components";
import KakaoMap from "./components/KakaoMap";

const Container = styled.div`
  /* display: flex; */
`;

const Map = styled.div`
  width: 500px;
  height: 500px;
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
      <KakaoMap />

    </Container>
  );
};

export default NearStore;
