import React from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
import { InfoBar, KakaoMap, SideBar } from "./components";

const Container = styled.div`
  display: flex;
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
      <InfoBar />
      <SideBar />
      <KakaoMap markerPositions={[]} size={[400, 400]}/>
    </Container>
  );
};

export default NearStore;
