import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
import { InfoBar, KakaoMap, SideBar } from "./components";
import axios from "axios";

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
  const [storeList, setStoreList] = useState([]);
  const [detailPageInfo, setDetailPageInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const getStoreDetail = async (id) => {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/stores/detail/${id}/`);
    let item = res;
    console.log(item.data);
    setIsOpen(true);
    setDetailPageInfo(res.data);
  }

  return (
    <Container>
      <InfoBar />
      <SideBar
        storeList={storeList}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        detailPageInfo={detailPageInfo}
        setDetailPageInfo={setDetailPageInfo}
        getStoreDetail={getStoreDetail}
      />
      <KakaoMap
        storeList={storeList}
        setStoreList={setStoreList}
        detailPageInfo={detailPageInfo}
        getStoreDetail={getStoreDetail}
      />
    </Container>
  );
};

export default NearStore;
