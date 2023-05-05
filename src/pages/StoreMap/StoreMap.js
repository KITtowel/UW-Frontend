import React, { useState } from "react";
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

  const [detailPageInfo, setDetailPageInfo] = useState(null);

  const getStoreDetail = (id) => {
    console.log(id);
    setDetailPageInfo(id);
  }

  return (
    <Container>
      <InfoBar />
      <SideBar
        detailPageInfo={detailPageInfo}
        setDetailPageInfo={setDetailPageInfo}
        getStoreDetail={getStoreDetail}
      />
      <KakaoMap
        detailPageInfo={detailPageInfo}
        getStoreDetail={getStoreDetail}
      />
    </Container>
  );
};

export default NearStore;
