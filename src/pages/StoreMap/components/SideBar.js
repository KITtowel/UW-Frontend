import React, { useState } from 'react';
import styled from 'styled-components';
import { BsSearch } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

const Wrapper = styled.div`
  position: fixed;
  /* display: flex; */
  /* flex-direction: column; */
  background-color: white;
  text-align: center;
  width: 300px;
  border: 1px solid black;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  transition: 0.4s ease;
  z-index: 99;
  transform: ${(props) => props.isOpen  ? "translateX(0px)" : "translateX(-300px)"};
`;

const SideButton = styled.button`
  position: fixed;
  padding: 0;
  left: 299px;
  top: 50%;
  width: 20px;
  height: 50px;
  z-index: 99;
  border: 0.5px solid black;
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
  &:hover {
    cursor: pointer;
  }
`;

const StoreList = styled.ul`
  height: 100%;
  overflow: auto;
`;

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

function SideBar() {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpen = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  return (
    <Wrapper isOpen={isOpen} >
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
    </Wrapper>
  );
}

export default SideBar;