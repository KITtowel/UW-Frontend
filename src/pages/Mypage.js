import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import Button from "../components/Button";
import User from "../components/User";
import LogoBtn from "../components/LogoBtn";
import { Link } from "react-router-dom";

const Ocean = styled.div`
  background: #3b21ff;
  height: 10%;
  width: 100%;
  position: absolute;
  bottom: 0;
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

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 28rem;
  height: 70vh;
  overflow: auto;
  justify-content: center;
  align-items: center;
  margin: 6rem auto 0 auto;
  padding: 2rem 2.5rem;
  border: none;
  outline: none;
  border-radius: 0.25rem;
  color: #121212;
  background: #ffffff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin: 15px 0;
`;

const ProfilePicture = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
`;

const InfoContainer = styled.div``;

const InfoRow = styled.div`
  margin: 10px;
  padding: 10px;
  border-bottom: 1px solid gray;
`;

const InfoLabel = styled.div`
  display: block;
  width: 100%;
`;

const InfoValue = styled.div`
  font-weight: bold;
`;

function MyPage() {
  const [userData, setUserData] = useState({
    profilePicture: "",
    id: "",
    email: "",
    nickname: "",
    name: "",
    gender: "",
  });

  useEffect(() => {
    setUserData({
      profilePicture: Logo,
      id: "aaa",
      email: "aaa@aaa.com",
      nickname: "uw",
      name: "언더워터",
      gender: "여",
    });
  }, []);

  return (
    <>
      <User />
      <LogoBtn />
      <Ocean>
        <Wave></Wave>
        <Wave></Wave>
      </Ocean>
      <Container>
        <Title>마이페이지</Title>
        <ProfilePicture src={userData.profilePicture} />
        <Link to="/edit">
          <Button>회원정보 변경</Button>
        </Link>
        <InfoContainer>
          <InfoRow>
            <InfoLabel>아이디</InfoLabel>
            <InfoValue>{userData.id}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>이메일 주소</InfoLabel>
            <InfoValue>{userData.email}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>닉네임</InfoLabel>
            <InfoValue>{userData.nickname}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>이름</InfoLabel>
            <InfoValue>{userData.name}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>성별</InfoLabel>
            <InfoValue>{userData.gender}</InfoValue>
          </InfoRow>
        </InfoContainer>
      </Container>
    </>
  );
}

export default MyPage;
