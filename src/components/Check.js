import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { BsFillCalculatorFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function Check() {
  const [isCalcOpen, setIsCalcOpen] = useState(false);

  const CheckBtn = styled.button`
    background: #9dc3e6;
    width: 50px;
    height: 50px;
    border: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    transition: box-shadow 0.3s;
    cursor: pointer;
    position: fixed;
    top: 110px;
    right: 30px;
    color: white;
    font-size: 25px;
    padding: 13px;
  `;

  const CheckDiv = styled.div`
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
    top: 110px;
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

  return (
    <>
      <CheckBtn onClick={onClickCheck}>
        <BsFillCalculatorFill />
      </CheckBtn>
      <CheckDiv ref={checkRef}>
        <Link to="https://www.shinhancard.com/pconts/html/benefit/fund2/MOBFM600/MOBFM600R01.html">
          <li>서울시</li>
        </Link>
        <Link to="https://gdream.gg.go.kr/Login/PointCheck.jsp">
          <li>경기도</li>
        </Link>
        <Link to="https://ddnews.co.kr/%EC%95%84%EB%8F%99-%EA%B8%89%EC%8B%9D-%EC%B9%B4%EB%93%9C-%EC%9E%94%EC%95%A1%EC%A1%B0%ED%9A%8C/">
          <li>부산시</li>
        </Link>
        <Link to="https://ice.purmee.kr/main/">
          <li>인천시</li>
        </Link>
        <Link to="https://play.google.com/store/apps/details?id=app.ss.gjDreamtree">
          <li>광주시</li>
        </Link>
        <Link to="https://play.google.com/store/apps/details?id=app.ss.chuncheonDreamtree">
          <li>춘천시</li>
        </Link>
      </CheckDiv>
    </>
  );
}

export default Check;
