import React, { useEffect } from "react";
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

function Main() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/nearstore");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Wrapper>
      <Link to="/login">
        <Choice>로그인</Choice>
      </Link>
      <Link to="/signup">
        <Choice>회원가입</Choice>
      </Link>
    </Wrapper>
  );
}

export default Main;
