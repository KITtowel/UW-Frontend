import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo2 from "../../../assets/logo2.png";
import { BsPersonFill } from "react-icons/bs";
import { AiFillCreditCard } from "react-icons/ai";
import Button from "../../../components/Button";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: 100vh;
  min-width: 80px;
  background-color: white;
  z-index: 5;
`;

const Logo = styled.button`
  background-image: url(${Logo2});
  background-size: contain;
  background-position: center;
  width: 60px;
  height: 60px;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  transition: box-shadow 0.3s;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3), 0 1px 10px rgba(0, 0, 0, 0.1);
  }
  margin-top: 10px;
`;

const Icon = styled.button`
  background-color: white;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  border: 0.3px solid rgba(var(--place-color-bg18), 1);
  font-size: 40px;
  transition: box-shadow 0.3s;
  text-align: center;
  line-height: 70px;
  color: #24a1e8;
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3), 0 1px 10px rgba(0, 0, 0, 0.1);
  }
`;

const Btn = styled(Button)`
  position: absolute;
  bottom: 15px;
  font-size: 12px;
  padding: 7px 12px;
  background-color: ${props => props.isAuthenticated === true && "#f08684"};
  :hover {
    background: ${props => props.isAuthenticated === true && "#ff6965"};
  }
`;

function InfoBar() {
  const storedUserId = localStorage.getItem("userId");
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const receivedLocation = localStorage.getItem("receivedLocation");

  const handleCheck = async e => {
    if (isAuthenticated !== true) {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
    }
    console.log(storedUserId);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/users/moneycheck/${storedUserId}/`
      );
      window.location.href = `${response.data.url}`;
    } catch (error) {
      if (receivedLocation === "거주지_선택") {
        alert("마이페이지에서 거주지 정보를 입력해주세요.");
        navigate("/mypage");
      }
      console.error(error);
    }
  };

  useEffect(() => {
    if (receivedLocation === "거주지_선택") {
      alert("마이페이지에서 거주지 정보를 입력해주세요.");
      navigate("/mypage");
    }
  }, []);

  return (
    <Container>
      <Logo onClick={() => window.location.reload()} />
      <Icon title="잔액 조회">
        <AiFillCreditCard onClick={() => handleCheck()} />
      </Icon>
      {isAuthenticated && (
        <Link to="/mypage">
          <Icon>
            <BsPersonFill />
          </Icon>
        </Link>
      )}

      {isAuthenticated === true ? (
        <Btn isAuthenticated={isAuthenticated} onClick={logout}>
          로그아웃
        </Btn>
      ) : (
        <Btn
          isAuthenticated={isAuthenticated}
          onClick={() => navigate("/login")}>
          로그인
        </Btn>
      )}
    </Container>
  );
}

export default InfoBar;
