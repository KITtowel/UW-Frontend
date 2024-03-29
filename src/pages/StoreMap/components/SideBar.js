import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsSearch } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";
import { AiTwotoneStar } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { Pagination } from '../../../components';
import DetailStore from './DetailStore';
import ReviewWrite from './ReviewWrite';
import apiClient from '../../../api';

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
  z-index: 2;
  /* transform: ${(props) => props.isOpen  ? "translateX(0px)" : props.detailPageInfo ? props.reviewing ? "translateX(-969px)" : "translateX(-619px)" : "translateX(-269px)"}; */
  @media (max-width: 768px) {
    background-color: transparent;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    top: ${(props) => `${props.windowHeight}px`};
    transform: ${props => props.isOpen ? "translateY(0px)" : "translateY(320px)"};
  }
  @media (min-width: 769px) {
    transform: ${(props) => props.isOpen  ? "translateX(0px)" : props.detailPageInfo ? props.reviewing ? "translateX(-969px)" : "translateX(-619px)" : "translateX(-269px)"};
  }
`;

const SideButton = styled.button`
  position: fixed;
  padding: 0;
  left: ${(props) => props.detailPageInfo ? props.reviewing ? '969px' : '619px' : '269px'};
  width: 20px;
  height: 50px;
  z-index: 99;
  border: 0.5px solid #D9D9D9;
  border-left: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: white;
  cursor: pointer;
  @media (max-width: 768px) {
    position: absolute;
    left: 48%;
    bottom: ${(props) => `${props.windowHeight+310}px`};
    /* transform: ${(props) =>
    `rotate(-90deg) ${props.isOpen ? "translateX(0px)" : "translateX(-320px)"}`}; */
    transform: rotate(-90deg);
    transition: 0.4s ease transform;
  }
  @media (min-width: 769px) {
    top: 50%;
  }
`;

const CloseDetailBtn = styled(SideButton)`
  width: 45px;
  height: 45px;
  @media (max-width: 768px) {
    left: 80%;
    margin-bottom: 15px;
  }
  @media (min-width: 769px) {
    left: ${(props) => props.reviewing ? '969px' : '619px'};
    top: 3%;
  }
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
  @media (max-width: 768px) {
    position: relative;
    /* width: 250px; */
    width: 100%;
    padding-right: 145px;
    top: ${(props) => `-${props.windowHeight}px`};
    transform: ${(props) => props.isOpen  ? "translateY(0px)" :  "translateY(-320px)"};
    transition: 0.4s ease;
    left: 27px;
  }
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
  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    top: ${(props) => `-${props.windowHeight}px`};
    border: none;
    padding-right: 15px;
    transform: ${(props) => props.isOpen  ? "translateY(0px)" :  "translateY(-320px)"};
    transition: 0.4s ease;
  }
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
  background-color: white;
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
        default:
          return 'black';
      }
    }
  }};
  @media (min-width: 769px) {
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
          default:
            return 'black';
        }
      }};
    }
  }
  
`;

const StoreList = styled.ul`
  background-color: white;
  height: calc(100vh - 185px);
  width: 100%;
  overflow: auto;
  border-bottom: 1.5px solid #aeaeae;
  @media (max-width: 768px) {
    position: absolute;
    bottom: ${(props) => `${props.windowHeight+25}px`};
    height: 300px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    box-shadow: 0 -5px 5px 0 rgba(0,0,0,.2), 0 -5px 15px 0 rgba(0,0,0,.1);
  }
`;

const NoStoreList = styled.div`
  line-height: calc(100vh - 200px);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none; 
  @media (max-width: 768px) {
    line-height: 290px;
  }
`;

const StoreItem = styled.li`
  height: 80px;
  width: 100%;
  border-bottom: 1px solid #D9D9D9;
  padding: 55px 15px 55px 15px;
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

function SideBar({
  state,
  storeList,
  setStoreList,
  detailPageInfo,
  setDetailPageInfo,
  getStoreDetail,
  isOpen,
  setIsOpen,
  clickedTag,
  setClickedTag,
  keyword,
  setKeyword,
  keyType,
  setKeyType
}) {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [reviewing, setReviewing] = useState(false);
  const tagList = ['전체', '한식', '중식', '일식', '분식', '아시안/양식', '치킨', '피자', '패스트푸드', '카페/디저트', '편의점', '기타'];
  const [showMobile, setShowMobile] = useState(false);
  const windowHeight = window.innerHeight;

  useEffect(() => {
    const handleResize = () => {
      setShowMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  async function getStoreSearchList() {
    const listRes = await apiClient.post(`/stores/search_distance_order/?page=${page}`, {
      "latitude": state.center.lat,
      "longitude": state.center.lng,
      "ne_latitude": state.neLat,
      "ne_longitude": state.neLng,
      "sw_latitude": state.swLat,
      "sw_longitude": state.swLng,
      "search_type": keyType,
      "search": keyword
    })
    setStoreList(listRes.data);
  }
  
  useEffect(() => {
    storeList.results && setTotal(storeList.count);
  }, [storeList])

  useEffect(() => {
    async function getStoreList()  {
      const listRes = await apiClient.post(`/stores/distance_order/?page=${page}`, {
        "latitude": state.center.lat,
        "longitude": state.center.lng,
        "ne_latitude": state.neLat,
        "ne_longitude": state.neLng,
        "sw_latitude": state.swLat,
        "sw_longitude": state.swLng
      })
      setStoreList(listRes.data);
    }
    async function getStoreTagList() {
      const listRes = await apiClient.post(`/stores/category_distance_order/?page=${page}`, {
        "latitude": state.center.lat,
        "longitude": state.center.lng,
        "ne_latitude": state.neLat,
        "ne_longitude": state.neLng,
        "sw_latitude": state.swLat,
        "sw_longitude": state.swLng,
        "category": `${clickedTag.join(" ")}`
      })
      setStoreList(listRes.data);
    }
    if (clickedTag[0] === '전체') {
      keyword === '' ? getStoreList() : getStoreSearchList();
    } else {
      getStoreTagList();
    }
  }, [page, clickedTag])

  useEffect(() => {
    // if(page !== 1) {
    //   setPage(1);
    // }
    setPage(1);
  }, [state])

  const tagClickHandler = (e) => {
    setKeyword('');
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
    setPage(1);
  }

  const handleOpen = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  const closeDetailPage = () => {
    reviewing ? setReviewing(false) : setDetailPageInfo(null);
  }

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  }

  const handleSelectChange = (e) => {
    setKeyType(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (keyword === '') {
      alert('검색할 단어를 입력해주세요.');
      return;
    }
    setClickedTag(['전체']);
    getStoreSearchList();
  }

  const handleStoreClick = (store_id) => {
    setReviewing(false);
    getStoreDetail(store_id)
  }

  return (
    <Container isOpen={isOpen} detailPageInfo={detailPageInfo} reviewing={reviewing} windowHeight={windowHeight}>
      <SideButton onClick={handleOpen} detailPageInfo={detailPageInfo} reviewing={reviewing} windowHeight={windowHeight}>
        <ArrowIcon>
          {isOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
        </ArrowIcon>
      </SideButton>
      {detailPageInfo && <DetailStore detailPageInfo={detailPageInfo} setReviewing={setReviewing} windowHeight={windowHeight}/>}
      {detailPageInfo && isOpen &&
        <CloseDetailBtn reviewing={reviewing} windowHeight={windowHeight}>
          <CloseIcon onClick={closeDetailPage}>
            <IoIosClose />
          </CloseIcon>
        </CloseDetailBtn>
      }
      {reviewing && <ReviewWrite getStoreDetail={getStoreDetail} store_id={detailPageInfo.store_id} setReviewing={setReviewing} windowHeight={windowHeight}/>}
      <SearchWrapper onSubmit={handleSubmit} windowHeight={windowHeight} isOpen={isOpen}>
        <SearchSelect value={keyType} onChange={handleSelectChange}>
          <option label="전체" value="전체" />
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
      <TagList windowHeight={windowHeight} isOpen={isOpen}>
        {tagList.map((tag) => <Tag key={tag.toString()} onClick={tagClickHandler} isClicked={clickedTag.includes(tag)}>{tag}</Tag>)}
      </TagList>
      <StoreList windowHeight={windowHeight}>
        {storeList.results && storeList.results.length >= 1 ? storeList.results.map((store, idx) => (
          <StoreItem key={idx}>
            <StoreInfo>
              <StoreHeader onClick={() => handleStoreClick(store.store_id)}>
                <StoreName>{store.store_name}</StoreName>
                <StoreTag>{store.category}</StoreTag>
              </StoreHeader>
              <div style={{display: 'flex'}}>
                <StoreLoc><LocationIcon />{store.store_address}</StoreLoc>
              </div>
              <StoreRate onClick={() => handleStoreClick(store.store_id)}><Star /> {`${Number.parseFloat(store.rating_mean).toFixed(1)} (리뷰 ${store.reviews_count} 개)`}</StoreRate>
            </StoreInfo>
          </StoreItem>
        )) : <NoStoreList>가맹점 데이터가 존재하지 않아요...</NoStoreList>}
      </StoreList>
      <Pagination total={total} limit={20} page={page} setPage={setPage} showMobile={showMobile} windowHeight={windowHeight} isOpen={isOpen}/>
    </Container>
  );
}

export default SideBar;