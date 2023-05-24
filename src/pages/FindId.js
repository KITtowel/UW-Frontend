import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo2 from "../assets/logo2.png";

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  max-width: 28rem;
  margin: 3rem auto;
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

function FindId() {
  async function handleEmailSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/username_find/`,
        {
          email: e.target.email.value,
        }
      );

      if (response.data.success) {
        alert("이메일이 성공적으로 전송되었습니다.");
      } else {
        alert("이메일이 성공적으로 전송되었습니다.");
      }
    } catch (error) {
      alert("이메일이 성공적으로 전송되었습니다.");
    }
  }

  return (
    <>
      <Link to="/">
        <Logo src={Logo2} />
      </Link>
      <Container>
        <Title>아이디 찾기</Title>
        <form onSubmit={handleEmailSubmit}>
          <div>
            <Label htmlFor="email">이메일</Label>
            <Input
              type="email"
              name="email"
              style={{ display: "inline", width: "75%", marginRight: "10px" }}
            />
            <Button
              type="submit"
              style={{
                display: "inline",
                width: "20%",
                padding: "13px 0",
                borderRadius: "3px",
                margin: "0",
              }}>
              확인
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
}

export default FindId;
