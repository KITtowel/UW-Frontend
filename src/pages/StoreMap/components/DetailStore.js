import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { AiOutlineLike, AiFillLike, AiOutlineAlert, AiTwotoneStar } from 'react-icons/ai';
import { MdLocationOn } from "react-icons/md";
import { useAuth } from '../../../contexts/AuthContext';
import apiClient from '../../../api';

const LocationIcon = styled(MdLocationOn)`
  font-size: 1.3em;
  margin-right: 2px;
  margin-top: -4px;
  color: #ef877d;
`
const Star = styled(AiTwotoneStar)`
  color: #24A1E8;
  font-size: 1em;
  margin-right: 2px;
`;

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
  @media (max-width: 768px) {
    position: absolute;
    bottom: ${(props) => `${props.windowHeight}px`};
    height: 325px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    left: 0;
    width: 100%;
    overflow: auto;
  }
`;

const StoreHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 100%;
  height: auto;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 3px;
`;

const StoreInfo = styled.div`
  display: flex;
  justify-content: center;
`;

const Name = styled.h1`
  font-size: 1.5em;
  margin-right: 3px;
  max-width: 250px;
  text-align: center;
`;

const Rate = styled.h2`
  display: flex;
  font-size: 0.95em;
  margin-bottom: 15px;
`;

const Loc = styled.h2`
  display: flex;
  font-size: 0.9em;
  margin: 13px 0 5px 0;
  text-align: left;
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
  margin-bottom: 5px;
`;

const LikeText = styled.h3`
  margin-bottom: 5px;
`;

const StoreMenu = styled(StoreHeader)`
  margin-top: 8px;
  margin-bottom: 8px;
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
  max-width: 245px;
  text-align: left;
  /* white-space: nowrap; */
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

const ReviewButton = styled.div`
  display: flex;
  align-items: center;
  padding-right: 15px;
  gap: 5px;
  color: #aeaeae;
  cursor: pointer;
  :hover {
    color: #24A1E8;
  }
`;

const ReviewText = styled.div`
  font-size: 0.8em;
`;

const NoReview = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReviewLists = styled.div`
  overflow: auto;
  border-bottom: 1.5px solid #aeaeae;
  height: ${(props) => `${props.reviewHeight}px`};
  width: 100%;
`;

const ReviewItem = styled.div`
  border-bottom: 1px solid #D9D9D9;
`;

const ReviewContent = styled.p`
  padding: 3px 15px 10px 15px;
  text-align: left;
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
  border: 0.3px solid rgba(var(--place-color-bg18), 1);
  margin-right: 10px;
  border-radius: 50%;
  box-shadow: 1px 1px 6px 0 rgba(0,0,0,.1);
`;

const ReviewID = styled.div`
  text-align: left;
  margin-bottom: 5px;
`;

const ReviewDate = styled.div`
  text-align: left;
  font-size: 0.9em;
  padding-left: 15px;
  margin-bottom: 10px;
  color: #aeaeae;
`;

const ReviewRate = styled.div`
  text-align: left;
`

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

function DetailStore({detailPageInfo, setReviewing, windowHeight}) {
  const { isAuthenticated, logout } = useAuth();
  const storedToken = localStorage.getItem("token");
  const user_id = localStorage.getItem("userId");
  const [isLike, setIsLike] = useState(detailPageInfo.liked_by_user);
  const [reviewHeight, setReviewHeight] = useState(100);
  const [profileImage, setProfileImage] = useState(null);

  const headerRef = useRef();
  const menuRef = useRef();

  useEffect(() => {
    setIsLike(detailPageInfo.liked_by_user);
  }, [detailPageInfo])

  const handleLikeBtn = () => {
    if (!isAuthenticated) {
      alert('로그인 후 이용해주세요');
      return;
    }
    changeIsLike();
    setIsLike((prev) => !prev);
  }

  useEffect(() => {
    menuRef.current && headerRef.current && setReviewHeight(window.innerHeight - menuRef.current.offsetHeight - headerRef.current.offsetHeight - 51);
    const handleResize = () => {
      menuRef.current && headerRef.current && setReviewHeight(window.innerHeight - menuRef.current.offsetHeight - headerRef.current.offsetHeight - 51);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  async function changeIsLike() {
    await apiClient.post(`/stores/like/${detailPageInfo.store_id}/`,
    null,
    {
      headers: {
        Authorization: `Token ${storedToken}`,
      },
    })
  }

  function handleReview() {
    if (!isAuthenticated) {
      alert('로그인 후 이용해주세요');
      return;
    }
    setReviewing(true);
  }

  async function handleReport(id) {
    const reason = prompt('신고 이유를 작성해주세요: ');

    if (reason) {
      try {
        await apiClient.post(
          `/stores/reviews/${id}/report/`,
          {
            reason: reason,
          },
          {
            headers: {
              Authorization: `Token ${storedToken}`,
            },
          }
        );
        alert('신고가 완료되었습니다.');
      } catch (error) {
        console.error('신고 요청 중 오류가 발생했습니다.');
      }
    } else {
      console.log('Report reason not provided.');
    }
  }

  function ImageComponent({imageUrl}) {
    // const imageUrl = "http://13.209.7.234:8000/media/profile/logo2.b3c9259ee43360d3d14a_cTtKZDf.png";
    const httpsUrl = `https://images.weserv.nl/?url=${encodeURIComponent(imageUrl.slice(imageUrl.indexOf('//') + 2))}`;
  
    return <ReviewProfile src={httpsUrl} />;
  }

  return (
    <Container windowHeight={windowHeight}>
      <StoreHeader ref={headerRef}>
        <StoreInfo>
          <Name>{detailPageInfo.store_name}</Name>
          <Tag>{detailPageInfo.category}</Tag>
        </StoreInfo>
        <Loc><LocationIcon /> {detailPageInfo.store_address}</Loc>
        <Rate><Star /> {Number.parseFloat(detailPageInfo.rating_mean).toFixed(1)} (리뷰 {detailPageInfo.reviews_count}개)</Rate>
        <LikeIcon isLike={isLike} onClick={handleLikeBtn}>
          {isLike ? <AiFillLike /> : <AiOutlineLike />}
        </LikeIcon>
        <LikeText>{isLike ? '내 맛집 목록에서 빼기' : '내 맛집 목록에 담기'}</LikeText>
        <LikeText>{detailPageInfo.likes_count}명이 이 가게를 좋아해요!</LikeText>
      </StoreHeader>
      <StoreMenu ref={menuRef}>
        <Title>대표 메뉴</Title>
        <Contour />
        <Menu>
          {detailPageInfo.menu ? detailPageInfo.menu.split(", ").map((me) => {
            let m = me.split(" ")
            return(
              <MenuItem>
                <MenuName>{m.splice(0, m.length-1).join(" ")}</MenuName>
                <MenuCost>{m[0]}</MenuCost>
              </MenuItem>
            )
          }) : <div>대표 메뉴 정보가 없어요.</div>}
        </Menu>
      </StoreMenu>
      <StoreReview>
        <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <Title>리뷰</Title>
          <ReviewButton onClick={handleReview}>
            <HiOutlinePencilAlt />
            <ReviewText>리뷰 쓰기</ReviewText>
          </ReviewButton>
        </div>
        <Contour />
        <ReviewLists reviewHeight={reviewHeight}>
          {detailPageInfo.reviews.length > 0 ? detailPageInfo.reviews.map((review) => (
            <ReviewItem>
              <ReviewUserInfo>
                {/* <ReviewProfile src={review.profile.image} /> */}
                <ImageComponent imageUrl={review.profile.image}/>
                <div>
                  <ReviewID>{review.profile.nickname}</ReviewID>
                  <ReviewRate>
                    {Array.from({ length: review.rating }).map(() => (
                      <Star />
                    ))}
                  </ReviewRate>
                </div>
                {parseInt(user_id) !== parseInt(review.author) &&
                  <ReviewReport onClick={() => handleReport(review.id)}>
                    <AiOutlineAlert style={{ marginRight: '3px', color: '#ef877d' }} />
                    <div style={{ fontSize: '0.8em', color: '#D9D9D9' }}>리뷰 신고</div>
                  </ReviewReport>
                }

              </ReviewUserInfo>
              <ReviewContent>
                {review.content}
              </ReviewContent>
              <ReviewDate>{review.published_data.substr(0, 10)}</ReviewDate>
            </ReviewItem>
          )) : <NoReview>리뷰가 아직 없어요.</NoReview>}
        </ReviewLists>
      </StoreReview>
    </Container>
  );
}

export default DetailStore;