import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LogoBtn from "../components/LogoBtn";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import KakaoLogin from "react-kakao-login";
import axios from "axios";
import { API_BASE_URL } from "../config";

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
  justify-content: center;
  align-items: center;
  max-width: 28rem;
  margin: 8rem auto 0 auto;
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

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/nearstore");
    }
  }, [isAuthenticated]);

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/users/login/`, {
        username,
        password,
      });
      const receivedToken = response.data.token;
      setToken(receivedToken);
      login();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <LogoBtn />
      <Ocean>
        <Wave></Wave>
        <Wave></Wave>
      </Ocean>
      <Container>
        <Title>로그인</Title>
        <form onSubmit={handleSubmit}>
          <div>
            <Input
              type="text"
              placeholder="아이디"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <Input
              type="password"
              id="password"
              placeholder="비밀번호"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <Button type="button">로그인</Button>
          {token && <p>Received token: {token}</p>}
        </form>
      </Container>
    </>
  );
}

export default Login;
