import React, { useState } from 'react';
import styled from 'styled-components';
import { BsSearch } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { Pagination } from '../../../components';

const Container = styled.div`
  position: fixed;
  background-color: white;
  text-align: center;
  width: 270px;
  height: 100vh;
  border-left: 1px solid #D9D9D9;
  border-right: 1px solid #D9D9D9;
  box-shadow: 0 0 5px 0 rgba(0,0,0,.2), 5px 0 15px 0 rgba(0,0,0,.1);
  left: 80px;
  transition: 0.4s ease;
  z-index: 4;
  transform: ${(props) => props.isOpen  ? "translateX(0px)" : "translateX(-269px)"};
`;

const SideButton = styled.button`
  position: fixed;
  padding: 0;
  left: 269px;
  top: 50%;
  width: 20px;
  height: 50px;
  z-index: 99;
  border: 0.5px solid #D9D9D9;
  border-left: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: white;
`;

const ArrowIcon = styled.div`
  width: 100%;
  height: 100%;
  font-size: 20px;
  text-align: center;
  line-height: 55px;
`

const SearchWrapper = styled.div`
  position: relative;
  padding: 10px;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding-left: 25px;
  height: 25px;
  background: #f9f9fa;
  color: #9dc3e6;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
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
  cursor: pointer;
`;

const StoreList = styled.ul`
  height: calc(100vh - 115px);
  overflow: scroll;
`;

const StoreItem = styled.li`
  height: 80px;
  border-bottom: 1px solid #D9D9D9;
  /* margin: 10px; */
  margin-left: 10px;
  margin-right: 10px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StoreInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 10px;
  gap: 5px;
`;

const StoreName = styled.h1`
  font-size: 1.3em;
  margin-right: 3px;
`;

const StoreLate = styled.h2``;

const StoreLoc = styled.h2``;

const StoreTag = styled.h3`
  align-self: flex-end;
  color: grey;
  font-size: 1em;
`;

function SideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const [page, setPage] = useState(1);

  const tagList = ['전체', '한식', '중식', '일식', '분식', '아시안/양식', '치킨', '피자', '패스트푸드', '카페/디저트', '편의점', '기타'];

  const handleOpen = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  return (
    <Container isOpen={isOpen} >
      <SideButton onClick={handleOpen}>
        <ArrowIcon>
          {isOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
        </ArrowIcon>
      </SideButton>
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
        {tagList.map((tag) => <Tag>{tag}</Tag>)}
      </TagList>
      <StoreList>
        {Array.from({ length: 15 }).map((_, idx) => (
          <StoreItem>
            <StoreInfo>
              <div style={{ display: "flex", justifyContent: "left" }}>
                <StoreName>GS옥계점</StoreName>
                <StoreTag>편의점</StoreTag>
              </div>
              <StoreLate>⭐️ 5.0 (100+)</StoreLate>
              <StoreLoc>경북 구미시 옥계북로 39</StoreLoc>
            </StoreInfo>
          </StoreItem>
        ))}
        <Pagination total={30} limit={15} page={page} setPage={setPage}/>
      </StoreList>
    </Container>
  );
}

export default SideBar;