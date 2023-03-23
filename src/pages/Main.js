import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10%;
`;

const Choice = styled.div`
  :hover {
    background: #2e75b6;
  }
  transition: all 0.3s ease-out;
  color: rgb(253, 249, 243);
  font-weight: 600;
  background: #9dc3e6;
  width: 400px;
  border-radius: 3px;
  text-align: center;
  margin: 20px;
  padding: 50px 30px;
  display: inline-block;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const PopUpWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const PopUpBox = styled.div`
  width: 300px;
  height: 200px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PopUpTitle = styled.h2`
  margin-top: 0;
`;

const PopUpCloseButton = styled.button`
  margin-top: 20px;
`;

const NeverShowAgainButton = styled.button`
  margin-top: 20px;
`;

const PageIndicator = styled.div`
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin-left: 10px;
`;

function Main() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/nearstore");
    } else {
      const hasSeenPopUp = localStorage.getItem("hasSeenPopUp");
      if (hasSeenPopUp !== "true") {
        setPopUpVisible(true);
      }
    }
  }, [isAuthenticated, navigate]);

  function handleClosePopUp() {
    setPopUpVisible(false);
  }

  function handleNeverShowAgain() {
    localStorage.setItem("hasSeenPopUp", "true");
    setPopUpVisible(false);
  }

  function handlePageButtonClicked(pageIndex) {
    setCurrentPageIndex(pageIndex);
  }

  const pageTitles = ["페이지 1", "페이지 2", "페이지 3"];

  return (
    <>
      <Wrapper>
        <Link to="/login">
          <Choice>로그인</Choice>
        </Link>
        <Link to="/signup">
          <Choice>회원가입</Choice>
        </Link>
      </Wrapper>
      {popUpVisible && (
        <PopUpWrapper>
          <PopUpBox>
            <PopUpTitle>{pageTitles[currentPageIndex]}</PopUpTitle>
            <PopUpCloseButton onClick={handleClosePopUp}>닫기</PopUpCloseButton>
            <NeverShowAgainButton onClick={handleNeverShowAgain}>
              다시 표시 안 함
            </NeverShowAgainButton>
            <PageIndicator>
              {pageTitles.map((title, index) => (
                <PageButton
                  key={index}
                  onClick={() => handlePageButtonClicked(index)}
                  disabled={currentPageIndex === index}>
                  {index + 1}
                </PageButton>
              ))}
            </PageIndicator>
          </PopUpBox>
        </PopUpWrapper>
      )}
    </>
  );
}

export default Main;
