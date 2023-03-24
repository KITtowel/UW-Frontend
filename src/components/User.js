import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function User() {
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const UserBtn = styled.button`
    background: #9dc3e6;
    width: 50px;
    height: 50px;
    border: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    transition: box-shadow 0.3s;
    cursor: pointer;
    position: fixed;
    top: 30px;
    right: 30px;
    color: white;
    font-size: 25px;
    padding: 13px;
  `;

  const UserDiv = styled.div`
    li {
      background: white;
      display: inline;
      list-style: none;
      margin: 5px;
      padding: 10px;
      border-radius: 50px;
    }
    * {
      text-decoration: none;
      color: black;
    }
    background: #9dc3e6;
    padding: 0 10px;
    height: 50px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
    justify-content: flex-end;
    transform: ${isCalcOpen ? "translateX(0)" : "translateX(200%)"};
    transition: transform 0.5s ease-in-out;
    position: fixed;
    top: 30px;
    right: 30px;
  `;

  const checkRef = useRef();

  useEffect(() => {
    const handleClickOutside = event => {
      if (checkRef.current && !checkRef.current.contains(event.target)) {
        setIsCalcOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onClickCheck = () => {
    setIsCalcOpen(!isCalcOpen);
  };

  const onClickLogout = () => {
    logout();
    navigate("/");
    isAuthenticated = false;
  };

  return (
    <>
      <UserBtn onClick={onClickCheck}>
        <FaUserAlt />
      </UserBtn>
      <UserDiv ref={checkRef}>
        {isAuthenticated ? (
          <button onClick={onClickLogout}>
            <li>로그아웃</li>
          </button>
        ) : (
          <Link to="/login">
            <li>로그인</li>
          </Link>
        )}
        <Link to="/mypage">
          <li>마이페이지</li>
        </Link>
      </UserDiv>
    </>
  );
}

export default User;
