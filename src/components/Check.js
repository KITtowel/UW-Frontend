import React, { useState } from "react";
import styled from "styled-components";
import { BsFillCalculatorFill } from "react-icons/bs";

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
        <li>서울</li>
        <li>경북</li>
        <li>대구</li>
        <li>부산</li>
        <li>경남</li>
      </CheckDiv>
    </>
  );
}

export default Check;
