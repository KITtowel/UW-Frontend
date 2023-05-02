import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'

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
`

const StoreHeader = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background-color: white;
  width: 100%;
  height: 30%;
  border-radius: 3px;
`

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
`

const LikeText = styled.h3`

`

const StoreMenu = styled(StoreHeader)`
  margin-top: 8px;
  margin-bottom: 8px;
`

const StoreReview = styled(StoreHeader)`
  height: 100%;
`

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
      <StoreMenu></StoreMenu>
      <StoreReview></StoreReview>
    </Container>
  );
}

export default DetailStore;