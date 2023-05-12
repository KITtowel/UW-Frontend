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
    setIsOpen(true);
    setDetailPageInfo(res.data);
  }

  const [state, setState] = useState({
    center: {
      lat: 35.854795175382435,
      lng: 128.54823034227059,
    },
    errMsg: null,
    isLoading: false,
    isPanto: false,
    level: 2,
    swLat: null,
    swLng: null,
    neLat: null,
    neLng: null,
  })

  return (
    <Container>
      <InfoBar />
      <SideBar
        state={state}
        storeList={storeList}
        setStoreList={setStoreList}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        detailPageInfo={detailPageInfo}
        setDetailPageInfo={setDetailPageInfo}
        getStoreDetail={getStoreDetail}
      />
      <KakaoMap
        state={state}
        setState={setState}
        setStoreList={setStoreList}
        detailPageInfo={detailPageInfo}
        getStoreDetail={getStoreDetail}
      />
    </Container>
  );
};

export default NearStore;
