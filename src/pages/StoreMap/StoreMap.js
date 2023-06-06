import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { InfoBar, KakaoMap, SideBar } from "./components";
import axios from "axios";

const Container = styled.div`
  display: flex;
`;

const NearStore = () => {
  const { isAuthenticated } = useAuth();
  const [storeList, setStoreList] = useState([]);
  const [detailPageInfo, setDetailPageInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [clickedTag, setClickedTag] = useState(['전체']);
  const [keyword, setKeyword] = useState('');
  const [keyType, setKeyType] = useState('전체');
  const storedToken = localStorage.getItem("token") || null;
  const navigate = useNavigate();

  useEffect(() => {
    const storedLocation = localStorage.getItem("location");
    if (storedLocation === "거주지_선택") {
      alert("마이페이지에서 거주지 정보를 입력해주세요.");
      navigate("/mypage");
    }
  }, []);
  
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

  const checkToken = () => {
    if (storedToken) {
      return `Token ${storedToken}`;
    } else {
      return null
    }
  }

  const getStoreDetail = async (id) => {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/stores/detail/${id}/`,
    null,
      {
        headers: {
          Authorization: checkToken(),
        },
      })
    setIsOpen(true);
    setDetailPageInfo(res.data);
  }

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
        clickedTag={clickedTag}
        setClickedTag={setClickedTag}
        keyword={keyword}
        setKeyword={setKeyword}
        keyType={keyType}
        setKeyType={setKeyType}
      />
      <KakaoMap
        state={state}
        setState={setState}
        setStoreList={setStoreList}
        detailPageInfo={detailPageInfo}
        getStoreDetail={getStoreDetail}
        clickedTag={clickedTag}
        keyword={keyword}
        keyType={keyType}
      />
    </Container>
  );
};

export default NearStore;
