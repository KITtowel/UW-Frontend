import axios from 'axios';
import React from 'react';
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
`;

const ReviewBox = styled.textarea`

`;

const Button = styled.button`

`;


const ReviewWrite = ({store_id}) => {
  const storedToken = localStorage.getItem("token");
  console.log(store_id);

  const handleSubmit = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/stores/detail/${store_id}/reviews/`,
    {
      "content": "살면서 먹어본 김밥집 중에 제일 맛있어요!",
      "rating": 3,
    },
    {
      headers: {
        Authorization: `Token ${storedToken}`,
      },
    })
    console.log(res);
  }

  return (
    <Container>
      <ReviewBox placeholder='후기를 작성해주세요.'/>
      <Button onClick={handleSubmit}>완료</Button>
    </Container>
  );
};

export default ReviewWrite;