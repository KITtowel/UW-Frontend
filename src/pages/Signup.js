import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import KakaoLogin from "react-kakao-login";
import axios from "axios";
import { API_BASE_URL } from "../config";

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

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handlePassword2Change = e => {
    setPassword2(e.target.value);
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await axios.post(`${API_BASE_URL}/users/register/`, {
      username: username,
      password: password,
      password2: password2,
      email: email,
    });
    console.log(response);
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            type="text"
            placeholder="이름"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="비번"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="비번2"
            value={password2}
            onChange={handlePassword2Change}
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder="이멜"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <Button type="submit">회원가입</Button>
      </form>
    </Container>
  );
}

export default Signup;