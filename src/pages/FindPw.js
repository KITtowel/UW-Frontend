import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Logo2 from "../assets/logo2.png";
import apiClient from "../api";

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

const Button = styled.button`
  display: block;
  margin: 20px auto 50px auto;
  padding: 11px 100px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: #9dc3e6;
  border: none;
  border-radius: 50px;
  outline: 0;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: #2e75b6;
  }
`;

const Logo = styled.img`
  width: 100px;
  display: block;
  margin: 20px auto;
`;

const Label = styled.label`
  display: block;
  color: #656565;
  text-align: left;
  margin: 10px;
`;

const Input = styled.input`
  width: 300px;
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
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin: 15px 0;
`;

function FindPw() {
  async function handleEmailSubmit(e) {
    e.preventDefault();

    try {
      const response = await apiClient.post(
        `/users/password_reset/`,
        {
          username: e.target.username.value,
          email: e.target.email.value,
        }
      );

      alert("이메일 전송에 실패했습니다. 다시 시도해주세요.");
    } catch (error) {
      console.error(error);
      alert("서버와 통신 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  }

  return (
    <>
      <Link to="/">
        <Logo src={Logo2} />
      </Link>
      <Container>
        <Title>비밀번호 재설정</Title>
        <form onSubmit={handleEmailSubmit}>
          <div>
            <Label htmlFor="username">아이디</Label>
            <Input
              type="text"
              name="username"
              style={{ display: "inline", width: "100%" }}
            />
            <Label htmlFor="email">이메일</Label>
            <Input
              type="email"
              name="email"
              style={{ display: "inline", width: "100%" }}
            />
            <Button type="submit">확인</Button>
          </div>
        </form>
      </Container>
    </>
  );
}

export default FindPw;
