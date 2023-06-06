import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RiUser6Line, RiLockLine } from "react-icons/ri";
import { BsCheckCircleFill, BsCheckCircle } from "react-icons/bs";
import Logo2 from "../assets/logo2.png";
import Kakao from "../assets/kakao.png";
import KakaoLogin from "react-kakao-login";

const Button = styled.button`
  padding: 11px 0;
  width: 100%;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: #9dc3e6;
  border: none;
  border-radius: 50px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: #2e75b6;
  }
`;

const Check = styled.div`
  font-size: 13px;
  text-align: left;
  margin: 10px 0;
  color: #636363;
`;

const Icon = styled.span`
  vertical-align: middle;
  margin: 0 10px 0 0;
  color: #636363;
`;

const Logo = styled.img`
  width: 100px;
  display: block;
  margin: 20px auto;
`;

const InputIconTop = styled.div`
  position: absolute;
  margin: 10px;
`;

const InputIconBottom = styled.div`
  position: absolute;
  margin: 10px;
`;

const InputTop = styled.input`
  width: 100%;
  padding: 11px 13px 11px 35px;
  background: #f9f9fa;
  color: #9dc3e6;
  border-radius: 4px 4px 0 0;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;

const InputBottom = styled.input`
  width: 100%;
  padding: 11px 13px 11px 35px;
  background: #f9f9fa;
  color: #9dc3e6;
  border-radius: 0 0 4px 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;

const None = styled.input`
  display: none;
`;

const Container = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 90%;
  justify-content: center;
  align-items: center;
  max-width: 28rem;
  margin: 60px auto;
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

const Bottom = styled.div`
  * {
    color: #000;
    text-decoration: none;
    margin: 0 10px;
    font-size: 13px;
  }
`;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const KakaoIcon = ({ onClick }) => (
    <div
      style={{
        fontSize: "50px",
        display: "inline-block",
        margin: "30px 15px",
        textAlign: "right",
        color: "#ffe810",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <img src={Kakao} width="60px" />
    </div>
  );

  const handleChecked = (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleKakaoLogin = async ({ response }) => {
    try {
      const access_token = response?.access_token;
      const code = response?.code;
      const profile = response?.profile;
      const nickname = profile?.kakao_account?.profile?.nickname;
      const email = profile?.kakao_account?.email;
      const axiosResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/rest-auth/kakao/`,
        {
          access_token,
          code,
          nickname,
          email,
        }
      );

      if (axiosResponse.status !== 200) {
        throw new Error("카카오 회원가입이 되지 않았습니다.");
      }

      const receivedKey = axiosResponse.data.key;
      const receivedUserId = axiosResponse.data.user_id;
      const receivedLocation = axiosResponse.data.location;

      localStorage.setItem("key", receivedKey);
      localStorage.setItem("userId", receivedUserId);
      localStorage.setItem("location", receivedLocation);
      login(receivedKey);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/login/`,
        {
          username,
          password,
        }
      );
      const receivedToken = response.data.token;
      const receivedUserId = response.data.user_id;

      localStorage.setItem("token", receivedToken);
      localStorage.setItem("userId", receivedUserId);

      login(receivedToken);
      navigate("/");
    } catch (error) {
      alert("아이디 또는 비밀번호를 다시 확인해주세요.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Link to="/">
        <Logo src={Logo2} />
      </Link>
      <Container>
        <Title>로그인</Title>
        <form onSubmit={handleSubmit}>
          <div>
            <InputIconTop>
              <RiUser6Line />
            </InputIconTop>
            <InputTop
              type="text"
              placeholder="아이디"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <InputIconBottom>
              <RiLockLine />
            </InputIconBottom>
            <InputBottom
              type="password"
              id="password"
              placeholder="비밀번호"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <Check>
            <label>
              <Icon>
                {isChecked ? <BsCheckCircleFill /> : <BsCheckCircle />}
              </Icon>
              <None
                type="checkbox"
                checked={isChecked}
                onChange={handleChecked}
              />
              로그인 상태 유지
            </label>
          </Check>
          <Button type="submit" onClick={handleSubmit}>
            로그인
          </Button>
        </form>
        <div>
          <KakaoLogin
            token="80ce118f2250d6342436cb0f233a5afb"
            redirectUri={`${process.env.REACT_APP_API_BASE_URL}/users/kakao/callback`}
            onSuccess={handleKakaoLogin}
            onFail={console.error}
            onLogout={console.info}
            render={({ onClick }) => <KakaoIcon onClick={onClick} />}
          />
        </div>
        <Bottom>
          <Link to="/findid">아이디 찾기</Link> |{" "}
          <Link to="/findpw">비밀번호 찾기</Link> |
          <Link to="/signup">회원가입</Link>
        </Bottom>
      </Container>
    </>
  );
}

export default Login;
