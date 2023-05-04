import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { AiOutlineAlert } from 'react-icons/ai';

const Container = styled.div`
  position: fixed;
  background-color: white;
  text-align: center;
  width: 350px;
  height: 100vh;
  border-right: 1px solid #D9D9D9;
  box-shadow: 5px 0 15px 0 rgba(0,0,0,.1);
  left: 269px;
  transition: 0.4s ease;
  z-index: 5;
  background-color: #D9D9D9;
`;

const StoreHeader = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background-color: white;
  width: 100%;
  height: auto;
  padding-top: 30px;
  padding-bottom: 30px;
  border-radius: 3px;
`;

const StoreInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 7px;
`;

const Name = styled.h1`
  font-size: 1.6em;
  margin-right: 3px;
  /* flex: 1; */
`;

const Rate = styled.h2`
  font-size: 0.95em;
`;

const Loc = styled.h2`
  font-size: 0.9em;
`;

const Tag = styled.h3`
  align-self: flex-end;
  color: grey;
  font-size: 1.1em;
`;

const LikeIcon = styled.div`
  cursor: pointer;
  font-size: 30px;
  width: 30px;
  height: 30px;
  color: #24A1E8;
`;

const LikeText = styled.h3`

`;

const StoreMenu = styled(StoreHeader)`
  margin-top: 8px;
  margin-bottom: 8px;
  height: auto;
  padding: 0;
`;

const Menu = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
  justify-content: center;
`

const MenuItem = styled.li`
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: relative;
  ::before {
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    border-top: 1px dashed;
    border-top-color: #aeaeae;
    content: "";
  }
`

const MenuName = styled.div`
  background-color: white;
  width: auto;
  height: auto;
  z-index: 1000;
  padding-right: 5px;
`;

const MenuCost = styled.div`
  background-color: white;
  width: auto;
  height: auto;
  padding-left: 5px;
  z-index: 1000;
`;

const StoreReview = styled(StoreHeader)`
  height: 100%;
  padding: 0;
`;

const ReviewLists = styled.div`

`;

const ReviewItem = styled.div`

`;

const ReviewContent = styled.p`

`;

const ReviewUserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  position: relative;
`

const ReviewProfile = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 100%;
  border: 1px solid black;
  margin-right: 10px;
`;

const ReviewID = styled.div`
  text-align: left;
  margin-bottom: 7px;
`;

const ReviewDate = styled.div`
  text-align: left;
  font-size: 0.9em;
`;

const ReviewReport = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 10px;
  cursor: pointer;
`;


const Title = styled.h2`
  align-self: flex-start;
  padding-left: 25px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: bold;
`;

const Contour = styled.div`
  width: 100%;
  border: 0.5px solid #D9D9D9;
  color: #D9D9D9; 
`;

function DetailStore(props) {
  const [isLike, setIsLike] = useState(false);

  const handleLikeBtn = () => {
    setIsLike((prev) => !prev)
  }

  return (
    <Container>
      <StoreHeader>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Name>GS옥계점</Name>
          <Tag>편의점</Tag>
        </div>
        <Loc>경북 구미시 옥계북로 39</Loc>
        <Rate>⭐️5.0 (리뷰 100개)</Rate>
        <LikeIcon isLike={isLike} onClick={handleLikeBtn}>
          {isLike ? <AiFillLike /> : <AiOutlineLike />}
        </LikeIcon>
        <LikeText>{isLike ? '내 맛집 목록에서 빼기' : '내 맛집 목록에 담기'}</LikeText>
      </StoreHeader>
      <StoreMenu>
        <Title>대표 메뉴</Title>
        <Contour />
        <Menu>
          <MenuItem>
            <MenuName>파인트 아이스크림</MenuName>
            <MenuCost>8,900 원</MenuCost>
          </MenuItem>
          <MenuItem>
            <MenuName>파인트 아이스크림32</MenuName>
            <MenuCost>8,900 원</MenuCost>
          </MenuItem>
          <MenuItem>
            <MenuName>파인트 아이스크림2</MenuName>
            <MenuCost>18,900 원</MenuCost>
          </MenuItem>
          <MenuItem>
            <MenuName>파인트 아이스크림</MenuName>
            <MenuCost>8,900 원</MenuCost>
          </MenuItem>
        </Menu>
      </StoreMenu>
      <StoreReview>
        <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
          <Title>리뷰</Title>
          <div style={{display: 'flex', alignItems: 'center', paddingRight: '15px', gap: '5px'}}>
            <HiOutlinePencilAlt style={{color: '#24A1E8'}}/>
            <div style={{fontSize: '0.8em', color: '#aeaeae'}}>리뷰 쓰기</div>
          </div>
        </div>
        <Contour />
        <ReviewLists>
          <ReviewItem>
            <ReviewUserInfo>
              <ReviewProfile src='https://itcm.co.kr/files/attach/images/813/669/168/006/bd6bf95e10a24e98df6a7000339c36a9.png'/>
              <div>
                <ReviewID>pigeonTwo</ReviewID>
                <ReviewDate>23/01/01</ReviewDate>
              </div>
              <ReviewReport>
                <AiOutlineAlert style={{marginRight: '3px'}}/>
                <div style={{fontSize: '0.8em'}}>리뷰 신고</div> 
              </ReviewReport>
              
            </ReviewUserInfo>
            <ReviewContent>
              별빛 가온누리 포도 바나나 사과 가온누리 여우별 나래 옅구름 옅구름 도르레 별빛 사과 그루잠 아리아 나래 가온누리 다솜 소록소록 아슬라 아련 그루잠 달볓 안녕 다솜 늘품 다솜 감사합니다 소솜 바나나 사과 도담도담 아슬라 노트북 함초롱하다 나래 미리내 노트북 컴퓨터 나래 바람꽃 별빛 별하 별하 별빛 여우비 나비잠 그루잠 나래 감사합니다.
            </ReviewContent>
          </ReviewItem>
        </ReviewLists>
      </StoreReview>
    </Container>
  );
}

export default DetailStore;