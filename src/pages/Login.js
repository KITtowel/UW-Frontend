import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import KakaoLogin from "react-kakao-login";

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  max-width: 28rem;
  width: 100%;
  margin: 2rem auto;
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

const Input = styled.input`
  max-width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #9dc3e6;
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
}
`;

function Login() {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/nearstore");
    }
  }, [isAuthenticated]);

  const handleInputId = e => {
    setInputId(e.target.value);
  };

  const handleInputPw = e => {
    setInputPw(e.target.value);
  };

  const handleKakaoLogin = response => {
    console.log(response);
    // TODO: Handle the Kakao login response here
  };

  const onClickLogin = () => {
    console.log("로그인 버튼 클릭!");
    login();
  };

  return (
    <Container>
      <Title>로그인</Title>
      <Input
        type="text"
        placeholder="아이디"
        name="input_id"
        value={inputId}
        onChange={handleInputId}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        name="input_pw"
        value={inputPw}
        onChange={handleInputPw}
      />
      <KakaoLogin
        token="3032e2541dc72d252ebcc1d74ba444c6"
        onSuccess={handleKakaoLogin}
        onFailure={console.error}
        render={props => (
          <Button type="button" onClick={props.onClick}>
            카카오 로그인
          </Button>
        )}
      />
      <Button type="button" onClick={onClickLogin}>
        로그인
      </Button>
    </Container>
  );
}

export default Login;
