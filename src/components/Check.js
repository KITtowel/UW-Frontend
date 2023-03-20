import React, { useState } from "react";
import styled from "styled-components";
import { BsFillCalculatorFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function Check() {
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const CheckBtn = styled.button`
    :hover {
      box-shadow: 3px 3px 1px 1px rgba(0, 0, 0, 0.3);
    }
    background: #9dc3e6;
    width: 50px;
    height: 50px;
    border: none;
    box-shadow: 3px 3px 1px 1px #ccc1cd;
    border-radius: 50%;
    transition: box-shadow 0.3s;
    cursor: pointer;
    position: fixed;
    top: 10px;
    right: 10px;
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
    box-shadow: 4px 4px 1px 1px #ccc1cd;
    justify-content: flex-end;
    transition: transform 3s;
    transform: ${isCalcOpen ? "translateX(0)" : "translateX(200%)"};
    position: fixed;
    top: 10px;
    right: 10px;
  `;
  const onClickCheck = () => {
    setIsCalcOpen(!isCalcOpen);
  };
  return (
    <>
      <CheckBtn onClick={onClickCheck}>
        <BsFillCalculatorFill />
      </CheckBtn>
      <CheckDiv>
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
