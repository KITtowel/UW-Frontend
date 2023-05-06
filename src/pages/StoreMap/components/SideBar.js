import React, { useState } from 'react';
import styled from 'styled-components';
import { BsSearch } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";
import { AiTwotoneStar } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { Pagination } from '../../../components';
import DetailStore from './DetailStore';

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
  transform: ${(props) => props.isOpen  ? "translateX(0px)" : props.detailPageInfo ? "translateX(-619px)" : "translateX(-269px)"};
`;

const SideButton = styled.button`
  position: fixed;
  padding: 0;
  left: ${(props) => props.detailPageInfo ? '619px' : '269px'};
  top: 50%;
  width: 20px;
  height: 50px;
  z-index: 99;
  border: 0.5px solid #D9D9D9;
  border-left: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: white;
  cursor: pointer;
`;

const CloseDetailBtn = styled(SideButton)`
  left: 619px;
  top: 3%;
  width: 45px;
  height: 45px;
`

const ArrowIcon = styled.div`
  width: 100%;
  height: 100%;
  font-size: 20px;
  text-align: center;
  line-height: 55px;
`

const CloseIcon = styled(ArrowIcon)`
  font-size: 30px;
`;

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
  border-bottom: 1.5px solid #aeaeae;
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
  height: calc(100vh - 190px);
  overflow: auto;
  border-bottom: 1.5px solid #aeaeae;
`;

const StoreItem = styled.li`
  height: 80px;
  border-bottom: 1px solid #D9D9D9;
  padding: 45px 0 45px 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background-color: #D9D9D9;
  }
`;

const StoreInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 7px;
`;

const StoreHeader = styled.div`
  display: flex;
  justify-content: left;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;

const StoreName = styled.h1`
  font-size: 1.25em;
  margin-right: 3px;
`;

const StoreRate = styled.h2`
  font-size: 0.95em;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
  display: flex;
`;

const StoreLoc = styled.h2`
  display: flex;
  font-size: 0.9em;
`;

const LocationIcon = styled(MdLocationOn)`
  font-size: 1em;
  margin-right: 2px;
  color: #ef877d;
`

const StoreTag = styled.h3`
  align-self: flex-end;
  color: grey;
  font-size: 0.97em;
`;

const Star = styled(AiTwotoneStar)`
  color: #24A1E8;
  font-size: 0.95em;
  margin-right: 2px;
`;

function SideBar({detailPageInfo, setDetailPageInfo, getStoreDetail, isOpen, setIsOpen}) {
  // const [isOpen, setIsOpen] = useState(true);
  const [page, setPage] = useState(1);

  const tagList = ['전체', '한식', '중식', '일식', '분식', '아시안/양식', '치킨', '피자', '패스트푸드', '카페/디저트', '편의점', '기타'];

  const handleOpen = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  const closeDetailPage = () => {
    setDetailPageInfo(null);
  }

  return (
    <Container isOpen={isOpen} detailPageInfo={detailPageInfo}>
      <SideButton onClick={handleOpen} detailPageInfo={detailPageInfo}>
        <ArrowIcon>
          {isOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
        </ArrowIcon>
      </SideButton>
      {detailPageInfo && <DetailStore />}
      {detailPageInfo && isOpen &&
      <CloseDetailBtn>
        <CloseIcon onClick={closeDetailPage}>
          <IoIosClose />
        </CloseIcon>
      </CloseDetailBtn>}
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
        {tagList.map((tag) => <Tag key={tag.toString()}>{tag}</Tag>)}
      </TagList>
      <StoreList>
        {Array.from({ length: 15 }).map((_, idx) => (
          <StoreItem key={idx}>
            <StoreInfo>
              <StoreHeader onClick={() => getStoreDetail(105)}>
                <StoreName>GS옥계점</StoreName>
                <StoreTag>편의점</StoreTag>
              </StoreHeader>
              <StoreLoc><LocationIcon />경북 구미시 옥계북로 39</StoreLoc>
              <StoreRate onClick={() => getStoreDetail(105)}><Star /> 5.0 (리뷰 100)</StoreRate>
            </StoreInfo>
          </StoreItem>
        ))}
      </StoreList>
      <Pagination total={30} limit={15} page={page} setPage={setPage} />
    </Container>
  );
}

export default SideBar;