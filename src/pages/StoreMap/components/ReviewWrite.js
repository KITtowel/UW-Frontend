import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  background-color: white;
  text-align: center;
  width: 350px;
  height: 100vh;
  border-right: 1px solid #D9D9D9;
  box-shadow: 5px 0 15px 0 rgba(0,0,0,.1);
  left: 619px;
  transition: 0.4s ease;
  z-index: 7;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
`;

const ReviewBox = styled.textarea`
  resize: none;
  height: 260px;
  background: #f9f9fa;
  color: #9dc3e6;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 15px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);

  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;

const Button = styled.button`
  margin-top: 15px;
  padding: 5px;
  color: #24A1E8;
  font-weight: 600;
  text-transform: uppercase;
  background: #fff;
  border: 1px solid #24A1E8;
  border-radius: 5px;
  outline: 0;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;

  :hover {
    background: #24A1E8;
    color: #fff;
  }
`;

const TextInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  font-size: 12px;
`;

const TextCount = styled.p`
  color: ${(props => props.count < 10 ? '#fe8080' : '#88bff0')};
`;

const StarRatingContainer = styled.div`
  display: inline-block;
  margin-bottom: 15px;
  font-size: 30px;
  color: #D9D9D9;
  cursor: pointer;
`;

const StarIcon = styled.div`
  display: inline-block;
  color: ${(props) => (props.isFilled ? '#24A1E8' : '#D9D9D9')};
`;

const FilledStarIcon = styled(StarIcon)`
  color: #24A1E8;
`;

const ReviewWrite = ({getStoreDetail, store_id, setReviewing}) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [content, setContent] = useState('');
  const storedToken = localStorage.getItem("token");

  const handleSubmit = async () => {
    if (selectedRating === 0) {
      alert('별점을 클릭해주세요.');
      return;
    }

    if (content.length < 10) {
      alert('10글자 이상의 후기을 작성해주세요.');
      return;
    }

    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/stores/detail/${store_id}/reviews/`,
    {
      "content": content,
      "rating": selectedRating,
    },
    {
      headers: {
        Authorization: `Token ${storedToken}`,
      },
    })
    if (res.status === 201) {
      getStoreDetail(store_id);
      setReviewing(false);
    }
  }

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleStarHover = (rating) => {
    setHoveredRating(rating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleChange = (e) => {
    if (e.target.value.length >= 301) {
      return;
    }
    setContent(e.target.value);
  }

  const renderStars = () => {
    const stars = [];
    for (let rating = 1; rating <= 5; rating++) {
      const StarComponent = rating <= selectedRating || rating <= hoveredRating ? FilledStarIcon : StarIcon;
      stars.push(
        <StarComponent
          key={rating}
          onClick={() => handleStarClick(rating)}
          onMouseEnter={() => handleStarHover(rating)}
          onMouseLeave={handleStarLeave}
          isFilled={rating <= selectedRating}
        >
          &#9733;
        </StarComponent>
      );
    }
    return stars;
  };

  return (
    <Container>
      <StarRatingContainer>
        {renderStars()}
      </StarRatingContainer>
      <TextInfo>
        <div>내용</div>
        <div style={{display: 'flex'}}>
          <TextCount count={content.length}>{content.length}자</TextCount>
          <TextCount count={content.length}>/300자</TextCount>
        </div>
      </TextInfo>
      <ReviewBox
        value={content}
        onChange={handleChange}
        placeholder='10글자 이상의 후기를 작성해주세요.'
        maxLength={300}
      />
      <Button onClick={handleSubmit}>완료</Button>
    </Container>
  );
};

export default ReviewWrite;