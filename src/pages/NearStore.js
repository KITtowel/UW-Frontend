import React from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import Check from "../components/Check";
import User from "../components/User";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
`;

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  flex: 1 1;
  border: 1px solid black;
`;

const SearchWrapper = styled.div`
  position: relative;
  padding: 10px;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 25px;
  padding-left: 25px;
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-45%);
`;

const TagList = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
`;

const Tag = styled.li`
  margin: 3px 5px;
  padding: 3px 5px;
  text-align: center;
  font-size: 0.8em;
  border-radius: 10px;
  border: 1px solid black;
  &:hover {
    cursor: pointer;
  }
`;

const StoreList = styled.ul``;

const StoreItem = styled.li`
  border-bottom: 1px solid black;
  margin: 10px;
  padding: 10px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;

const StoreIcon = styled.div`
  text-align: center;
  line-height: 45px;
  width: 50px;
  height: 50px;
  /* margin-right: 10px; */
`;

const StoreInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StoreName = styled.h1``;

const StoreLate = styled.h2``;

const StoreTag = styled.h3`
  align-self: flex-end;
  color: grey;
  font-size: 0.7em;
`;

const Map = styled.div`
  text-align: center;
  flex: 4 4;
  border: 1px solid black;
`;

const NearStore = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // console.log("isAuthenticated: ", isAuthenticated);
  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  return (
    <Container>
      <User />
      <Check />
      <SideBar>
        <SearchWrapper>
          <SearchIcon>
            <BsSearch />
          </SearchIcon>
          <SearchInput
            type="search"
            name="search"
            placeholder="검색어를 입력해주세요."
          />
        </SearchWrapper>
        <TagList>
          <Tag>전체</Tag>
          <Tag>한식</Tag>
          <Tag>중식</Tag>
          <Tag>일식</Tag>
          <Tag>양식</Tag>
          <Tag>편의점</Tag>
        </TagList>
        <StoreList>
          {Array.from({ length: 100 }).map(() => (
            <StoreItem>
              <StoreIcon>Icon</StoreIcon>
              <StoreInfo>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <StoreName>GS옥계점</StoreName>
                  <StoreTag>편의점</StoreTag>
                </div>
                <StoreLate>⭐️ 5.0 (100+)</StoreLate>
              </StoreInfo>
            </StoreItem>
          ))}
        </StoreList>
      </SideBar>
      <Map>map</Map>
    </Container>
  );
};

export default NearStore;
