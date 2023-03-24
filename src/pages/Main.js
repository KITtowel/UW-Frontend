import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

const Ocean = styled.div`
  background: #3b21ff;
  height: 10%;
  width: 100%;
  position: absolute;
  top: calc(100vh - 58px);
  left: 0;
  z-index: -1;
`;

const Wave = styled.div`
  background: url(https://venkat369.github.io/development/wave.svg) repeat-x; 
  position: absolute;
  top: -198px;
  width: 6400px;
  height: 198px;
  animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;

  &:nth-of-type(2) {
    top: -175px;
    animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) -.125s infinite, swell 7s ease -1.25s infinite;
    opacity: 1;
  }
}

@keyframes wave {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -1600px;
  }
}

@keyframes swell {
  0%, 100% {
    transform: translate3d(0, -25px, 0);
  }
  50% {
    transform: translate3d(0, 5px, 0);
  }
}
`;

const Wrapper1 = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const Wrapper2 = styled.div`
  display: flex;
  justify-content: center;
  background: #3b21ff;
  padding: 10% 0;
`;

const Choice = styled.div`
  :hover {
    background: #2e75b6;
  }
  transition: all 0.3s ease-out;
  color: rgb(253, 249, 243);
  font-weight: 600;
  background: #24a1e8;
  width: 400px;
  border-radius: 30px;
  font-size: 30px;
  text-align: center;
  margin: 20px;
  padding: 150px 0;
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

const Img = styled.img`
  margin: auto;
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
      <Wrapper1>
        <Ocean>
          <Wave></Wave>
          <Wave></Wave>
        </Ocean>
        <Img src={Logo} alt="로고"></Img>
      </Wrapper1>
      <Wrapper2>
        <Link to="/login">
          <Choice>로그인</Choice>
        </Link>
        <Link to="/signup">
          <Choice>회원가입</Choice>
        </Link>
      </Wrapper2>
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
