import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsSearch } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";
import { AiTwotoneStar } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { Pagination } from '../../../components';
import DetailStore from './DetailStore';
import axios from 'axios';

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

const SearchWrapper = styled.form`
  position: relative;
  display: flex;
  padding: 10px;
  width: 100%;
`;

const SearchSelect = styled.select`
  background: #f9f9fa;
  border-radius: 4px 0 0 4px;
  border: 1px solid rgba(245, 245, 245, 0.7);
  border-right: 0;
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`

const SearchInput = styled.input`
  width: 100%;
  padding-right: 25px;
  height: 25px;
  background: #f9f9fa;
  color: #9dc3e6;
  border-radius: 0 4px 4px 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  border-left: 0;
  font-size: 14px;
  transition: all 0.3s ease-out;
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  font-size: 0.9em;
  top: 50%;
  right: 15px;
  transform: translateY(-45%);
  cursor: pointer;
  transition: font-size 0.3s;
  :hover{
    font-size: 1em;
  }
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
  padding: 5px 8px;
  text-align: center;
  font-size: 0.8em;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  border: 0.3px solid rgba(var(--place-color-bg18), 1);
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: ${(props) => {
    if (props.isClicked) {
      switch(props.children) {
        case '전체':
          return '#e5ecf0';
        case '한식':
          return '#FFDAB9';
        case '중식':
          return '#FFD700';
        case '일식':
          return '#cde7b6';
        case '분식':
          return '#ffb8b8';
        case '아시안/양식':
          return '#FFA07A';
        case '치킨':
          return '#f1b62e';
        case '피자':
          return '#e0e094';
        case '패스트푸드':
          return '#F9D1AD';
        case '카페/디저트':
          return '#CD853F';
        case '편의점':
          return '#fefecc';
        case '기타':
          return '#cccccc';
      }
    }
  }};
  :hover {
    background-color: ${(props) => {
      switch(props.children) {
        case '전체':
          return '#e5ecf0';
        case '한식':
          return '#FFDAB9';
        case '중식':
          return '#FFD700';
        case '일식':
          return '#cde7b6';
        case '분식':
          return '#ffb8b8';
        case '아시안/양식':
          return '#FFA07A';
        case '치킨':
          return '#f1b62e';
        case '피자':
          return '#e0e094';
        case '패스트푸드':
          return '#F9D1AD';
        case '카페/디저트':
          return '#CD853F';
        case '편의점':
          return '#fefecc';
        case '기타':
          return '#cccccc';
      }
    }};
  }
`;

const StoreList = styled.ul`
  height: calc(100vh - 190px);
  width: 100%;
  overflow: auto;
  border-bottom: 1.5px solid #aeaeae;
`;

const StoreItem = styled.li`
  height: 80px;
  width: 100%;
  border-bottom: 1px solid #D9D9D9;
  padding: 50px 15px 50px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background-color: #f4f8fb;
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
  cursor: pointer;
  width: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;

const StoreName = styled.h1`
  font-size: 1.2em;
  margin-right: 3px;
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #0068c3;
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
  text-align: left;
`;

const LocationIcon = styled(MdLocationOn)`
  font-size: 15px;
  margin-right: 2px;
  min-width: 15px;
  height: 15px;
  color: #ef877d;
`

const StoreTag = styled.h3`
  align-self: flex-end;
  color: grey;
  font-size: 0.85em;
`;

const Star = styled(AiTwotoneStar)`
  color: #24A1E8;
  font-size: 0.95em;
  margin-right: 2px;
`;

function SideBar({state, storeList, setStoreList, detailPageInfo, setDetailPageInfo, getStoreDetail, isOpen, setIsOpen, clickedTag, setClickedTag}) {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const tagList = ['전체', '한식', '중식', '일식', '분식', '아시안/양식', '치킨', '피자', '패스트푸드', '카페/디저트', '편의점', '기타'];
  const [keyword, setKeyword] = useState('');
  const [keyType, setKeyType] = useState('가게명');

  useEffect(() => {
    storeList.results && setTotal(storeList.count);
  }, [storeList])

  useEffect(() => {
    async function getStoreList()  {
      const listRes = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/stores/distance_order/?page=${page}`, {
        "latitude": state.center.lat,
        "longitude": state.center.lng,
        "ne_latitude": state.neLat,
        "ne_longitude": state.neLng,
        "sw_latitude": state.swLat,
        "sw_longitude": state.swLng
      })
      setStoreList(listRes.data);
    }
    getStoreList();
  }, [page])

  const tagClickHandler = (e) => {
    let temp = [...clickedTag];
    if (temp[0] === '전체' && e.target.textContent !== '전체') {
      temp = [];
    }
    if (e.target.textContent === '전체') {
      temp = ['전체'];
    } else {
      temp.includes(e.target.textContent) ? temp = temp.filter(s => s !== e.target.textContent) : temp.push(e.target.textContent);
    }
    if (temp.length === 0) temp = ['전체'];
    setClickedTag(temp);
  }

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

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  }

  const handleSelectChange = (e) => {
    setKeyType(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword === '') {
      alert('검색할 단어를 입력해주세요.');
    }
    console.log(keyword, keyType);
  }

  return (
    <Container isOpen={isOpen} detailPageInfo={detailPageInfo}>
      <SideButton onClick={handleOpen} detailPageInfo={detailPageInfo}>
        <ArrowIcon>
          {isOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
        </ArrowIcon>
      </SideButton>
      {detailPageInfo && <DetailStore detailPageInfo={detailPageInfo}/>}
      {detailPageInfo && isOpen &&
      <CloseDetailBtn>
        <CloseIcon onClick={closeDetailPage}>
          <IoIosClose />
        </CloseIcon>
      </CloseDetailBtn>}
      <SearchWrapper onSubmit={handleSubmit}>
        <SearchSelect value={keyType} onChange={handleSelectChange}>
          <option label="가게명" value="가게명" />
          <option label="메뉴" value="메뉴" />
        </SearchSelect>
        <SearchIcon onClick={handleSubmit}>
          <BsSearch />
        </SearchIcon>
        <SearchInput
          type="search"
          name="search"
          placeholder="검색어를 입력해주세요."
          value={keyword}
          onChange={handleInputChange}
        />
      </SearchWrapper>
      <TagList>
        {tagList.map((tag) => <Tag key={tag.toString()} onClick={tagClickHandler} isClicked={clickedTag.includes(tag)}>{tag}</Tag>)}
      </TagList>
      <StoreList>
        {storeList.results && storeList.results.map((store, idx) => (
          <StoreItem key={idx}>
            <StoreInfo>
              <StoreHeader onClick={() => getStoreDetail(store.store_id)}>
                <StoreName>{store.store_name}</StoreName>
                <StoreTag>{store.category}</StoreTag>
              </StoreHeader>
              <div style={{display: 'flex'}}>
                <StoreLoc><LocationIcon />{store.store_address}</StoreLoc>
              </div>
              <StoreRate onClick={() => getStoreDetail(store.store_id)}><Star /> {`${store.rating_mean} (리뷰 ${store.reviews_count} 개)`}</StoreRate>
            </StoreInfo>
          </StoreItem>
        ))}
      </StoreList>
      <Pagination total={total} limit={20} page={page} setPage={setPage} />
    </Container>
  );
}

export default SideBar;